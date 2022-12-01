<script setup lang="ts">
const { projectScreens, projectSettings, sidebar, sidebarColour } =
  useProject();
const { getAngle, hslToHex, isDarkText, sidebarColours } = colourHelper();
const projectSettingsEl = ref(null);
const { getIcon } = useIcon();
const canvas = ref(null);
const picker = ref(null);
const pickerSlider = ref(null);
const pickerConfig = reactive({
  x: 30,
  y: 30,
  slider: 50,
  colourDragging: false,
  sliderDragging: false,
});

function setColour(hsl) {
  const { h, s, l } = hsl;
  sidebar.value.colour.background.h = h;
  sidebar.value.colour.background.s = s;
  sidebar.value.colour.background.l = l;
  const hex = hslToHex(sidebar.value.colour.background);
  sidebar.value.colour.darkText = isDarkText(hex);
  pickerConfig.value.slider = l;
}

function mousedownColour(e: MouseEvent) {
  e.preventDefault();
  pickerConfig.colourDragging = true;
  const { top, left, width, height } = picker.value.getBoundingClientRect();
  const { clientX, clientY } = e;
  if (e.target === picker.value) {
    pickerConfig.x = clientX - left;
    pickerConfig.y = clientY - top;
  }
  let cache = { ...pickerConfig };
  const mousemove = (me: MouseEvent) => {
    me.preventDefault();
    const { clientX: mx, clientY: my } = me;
    pickerConfig.x = Math.max(0, Math.min(width, cache.x + (mx - clientX)));
    pickerConfig.y = Math.max(0, Math.min(height, cache.y + (my - clientY)));
    const ang = getAngle(pickerConfig.x, pickerConfig.y, width / 2, height / 2);
    sidebar.value.colour.background.h = ang;
    sidebar.value.colour.background.l = parseInt(pickerConfig.slider);
    const hex = hslToHex(sidebar.value.colour.background);
    sidebar.value.colour.darkText = isDarkText(hex);
  };
  const mouseup = () => {
    pickerConfig.colourDragging = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  };
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
}

function mousedownSlider(e: MouseEvent) {
  e.preventDefault();
  pickerConfig.sliderDragging = true;
  const { left, width } = pickerSlider.value.getBoundingClientRect();
  const { clientX, clientY } = e;
  if (e.target === pickerSlider.value) {
    pickerConfig.slider = ((clientX - left) / width) * 100;
  }
  let cache = pickerConfig.slider;
  const mousemove = (me: MouseEvent) => {
    me.preventDefault();
    const { clientX: mx, clientY: my } = me;
    const per = ((mx - clientX) / width) * 100;
    pickerConfig.slider = Math.max(0, Math.min(100, cache + per));
    sidebar.value.colour.background.l = parseInt(pickerConfig.slider);
    const hex = hslToHex(sidebar.value.colour.background);
    sidebar.value.colour.darkText = isDarkText(hex);
  };
  const mouseup = () => {
    pickerConfig.sliderDragging = false;
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  };
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
}

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.style.width = canvas.clientWidth + 'px';
  canvas.style.height = canvas.clientHeight + 'px';
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

function uploadProjectLogo() {
  const el = document.createElement('input');
  el.type = 'file';
  el.accept = 'image/*';
  el.oninput = (e) => {
    if (e.target.files) {
      console.log(e.target.files);
      const [file] = e.target.files;
      sidebar.value.logo = URL.createObjectURL(file);
    }
  };
  el.click();
}

async function sampleColorFromScreen(abortController) {
  const eyeDropper = new EyeDropper();
  try {
    const result = await eyeDropper.open({ signal: abortController.signal });
    console.log(result);
    return result.sRGBHex;
  } catch (e) {
    return null;
  }
}

onMounted(() => {
  canvas.value.width = picker.value.clientWidth;
  canvas.value.height = picker.value.clientHeight;
  const ctx = setupCanvas(canvas.value);
  if (ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = -1; i < 200; i = i + 5) {
      for (let z = -1; z < 200; z = z + 5) {
        ctx.fillRect(i, z, 1, 1);
      }
    }
    ctx.fill();
  }
});
</script>

<template>
  <div
    class="project-settings"
    ref="projectSettingsEl"
    @mouseleave="projectSettings.visible = !projectSettings.visible"
  >
    <!-- <div
      class="back arrow--after arrow-white"
      @click="projectSettings.visible = !projectSettings.visible"
    ></div> -->
    <div class="colour">
      <div class="colour__picker" @mousedown="mousedownColour" ref="picker">
        <canvas ref="canvas"></canvas>
        <div
          class="dot"
          :title="sidebarColour.background"
          :style="{
            background: sidebarColour.background,
            cursor: pickerConfig.colourDragging ? 'grabbing' : 'grab',
            transform: `translate3d(${pickerConfig.x}px, ${pickerConfig.y}px, 0)`,
          }"
        ></div>
      </div>
      <div class="colour__saturation" @mousedown="mousedownSlider">
        <div class="saturation__inner" ref="pickerSlider">
          <span
            class="lighten"
            :style="{
              width: `${pickerConfig.slider}%`,
            }"
          ></span>
          <span
            class="handle"
            :style="{
              cursor: pickerConfig.sliderDragging ? 'grabbing' : 'grab',
            }"
          ></span>
        </div>
      </div>
      <div class="preset-colours">
        <div class="preset-colours__arrow arrow--after arrow-white"></div>
        <div class="preset-colours__dots">
          <span
            v-for="colour in sidebarColours"
            @click="setColour(colour)"
            :style="{
              background: hslToHex(colour),
            }"
          ></span>
        </div>
        <div class="preset-colours__arrow arrow--after arrow-white"></div>
      </div>
    </div>
    <div class="project-logo-upload">
      <div class="button" @click="uploadProjectLogo">Upload your Logo</div>
      <div
        class="button button--droplet"
        v-html="getIcon('droplet')"
        @click="sampleColorFromScreen"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-settings {
  position: fixed;
  margin-left: 12px;
  top: 12px;
  left: calc(var(--sidebar-width) * 1px);
  width: calc(var(--sidebar-width) * 1px);
  background: #41495f;
  border-radius: 16px;
  box-shadow: 10px 10px 20px rgba(#111, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #fff;

  .back {
    padding: 12px;
    border-bottom: 1px solid rgba(#fff, 0.05);
    cursor: pointer;
    display: flex;

    &:hover {
      background: rgba(255, 255, 255, 0.02);
    }
  }

  .title {
    font-size: 0.9rem;
    margin: 12px 0;
  }

  .colour {
    margin: 12px;

    .preset-colours {
      margin: 12px -4px;
      display: flex;

      &__arrow {
        width: 18px;
        height: 24px;
        cursor: pointer;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        display: flex;

        &:hover {
          background: rgba(#fff, 0.1);
        }

        &:last-child {
          transform: rotate(180deg);
        }
      }

      &__dots {
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        display: flex;
        gap: 6px;

        span {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background: gray;
          box-shadow: inset 0 0 0 2px rgba(#fff, 0.1);
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            box-shadow: inset 0 0 0 2px rgba(#fff, 0.2);
          }
        }
      }
    }

    &__picker {
      position: relative;
      aspect-ratio: 1/1;
      box-shadow: 0 0 0 1px rgba(#fff, 0.1);
      background: rgba(#fff, 0.1);
      border-radius: 8px;
      cursor: pointer;

      canvas {
        border-radius: 8px;
        pointer-events: none;
        display: block;
      }

      .dot {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 0 0 4px rgba(#fff, 0.5);
      }
    }

    &__saturation {
      margin: 8px -2px;
      padding: 0 8px;
      border-radius: 8px;
      background: rgba(#fff, 0.1);
      cursor: pointer;

      .saturation {
        &__inner {
          width: 100%;
          height: 24px;
          display: flex;

          .lighten {
            width: 50%;
            flex-shrink: 0;
            pointer-events: none;
          }

          .handle {
            width: 12px;
            margin: 2px 0;
            border-radius: 8px;
            background: rgba(#fff, 0.2);
            transform: translate3d(-50%, 0, 0);
            flex-shrink: 0;
            cursor: grab;
          }
        }
      }
      &:hover {
        background: rgba(#fff, 0.2);

        .handle {
          background: rgba(#fff, 0.4);
        }
      }
    }
  }

  .project-logo-upload {
    margin: 12px;
    display: flex;
    gap: 12px;

    .button {
      padding: 8px;
      flex-grow: 1;
      font-size: 0.8rem;
      text-align: center;
      border-radius: 6px;
      border: 1px solid rgba(#fff, 0.1);
      box-shadow: 0 2px 4px rgba(#fff, 0.05);
      color: rgba(#222, 0.6);
      background: #fff;
      cursor: pointer;

      &:hover {
        background: darken(#fff, 5%);
        box-shadow: 0 2px 4px rgba(#111, 0.1);
        color: rgba(#222, 1);
      }

      &--droplet {
        padding: 0 8px;
        flex-grow: unset;
        flex-shrink: 1;
        justify-content: center;
        align-items: center;
        display: flex;

        :deep(svg) {
          width: 18px;
          justify-content: center;
          align-items: center;
          display: flex;
        }
      }
    }
  }
}
</style>

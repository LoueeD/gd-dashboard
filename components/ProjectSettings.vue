<script setup lang="ts">
const { projectScreens, projectSettings, sidebar, sidebarColour } =
  useProject();
const { getAngle, hslToHex, isDarkText } = colourHelper();
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
    const ang =
      180 + getAngle(pickerConfig.x, pickerConfig.y, width / 2, height / 2);
    sidebar.value.colour.background.h = ang;
    sidebar.value.colour.background.l = pickerConfig.slider;
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
  const { top, left, width, height } =
    pickerSlider.value.getBoundingClientRect();
  const { clientX, clientY } = e;
  let cache = pickerConfig.slider;
  if (e.target === pickerSlider.value) {
    pickerConfig.slider = clientX - left;
  }
  const mousemove = (me: MouseEvent) => {
    me.preventDefault();
    const { clientX: mx, clientY: my } = me;
    pickerConfig.slider = Math.max(0, Math.min(width, cache + (mx - clientX)));
    sidebar.value.colour.background.l = pickerConfig.slider;
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

onMounted(() => {
  canvas.value.width = picker.value.clientWidth;
  canvas.value.height = picker.value.clientHeight;
  const ctx = setupCanvas(canvas.value);
  if (ctx) {
    ctx.fillStyle = '#cdcdcd';
    for (let i = 0; i < 200; i = i + 5) {
      for (let z = 0; z < 200; z = z + 5) {
        ctx.fillRect(i, z, 1, 1);
      }
    }
    ctx.fill();
  }
});
</script>

<template>
  <div class="project-settings">
    <div
      class="back arrow--after"
      @click="projectSettings.visible = !projectSettings.visible"
    ></div>
    <div class="colour">
      <div class="colour__picker" @mousedown="mousedownColour" ref="picker">
        <canvas ref="canvas"></canvas>
        <div
          class="dot"
          :style="{
            background: sidebarColour.background,
            cursor: pickerConfig.colourDragging ? 'grabbing' : 'grab',
            transform: `translate3d(${pickerConfig.x}px, ${pickerConfig.y}px, 0)`,
          }"
        ></div>
      </div>
      <div
        class="colour__saturation"
        ref="pickerSlider"
        @mousedown="mousedownSlider"
      >
        <span
          class="lighten"
          :style="{
            cursor: pickerConfig.sliderDragging ? 'grabbing' : 'grab',
            width: `${pickerConfig.slider}%`,
          }"
        ></span>
        <span
          class="handle"
          :style="{ background: sidebarColour.background }"
        ></span>
      </div>
    </div>
    <div class="project-logo-upload">
      <div class="button" @click="uploadProjectLogo">Upload your Logo</div>
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
  background: #fff;
  border-radius: 4px;
  box-shadow: 10px 10px 20px rgba(#111, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #111;

  .back {
    padding: 12px;
    border-bottom: 1px solid rgba(#222, 0.05);
    cursor: pointer;
    display: flex;
  }

  .title {
    font-size: 0.9rem;
    margin: 12px 0;
  }

  .colour {
    margin: 12px;

    &__picker {
      position: relative;
      aspect-ratio: 1/1;
      border: 1px solid rgba(#222, 0.05);
      border-radius: 8px;
      cursor: pointer;

      canvas {
        pointer-events: none;
        display: block;
      }

      .dot {
        position: absolute;
        top: -15px;
        left: -15px;
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 100%;
        border: 4px solid lighten(#666, 48%);
      }
    }

    &__saturation {
      height: 24px;
      margin: 8px -2px;
      border-radius: 4px;
      background: rgba(#222, 0.05);
      cursor: pointer;
      display: flex;

      .lighten {
        width: 50%;
        flex-shrink: 0;
      }

      .handle {
        width: 12px;
        margin: 2px 0;
        border-radius: 4px;
        background: rgba(#222, 0.2);
        transform: translate3d(-50%, 0, 0);
        cursor: grab;
      }

      &:hover {
        background: rgba(#222, 0.07);

        .handle {
          background: rgba(#222, 0.4);
        }
      }
    }
  }

  .project-logo-upload {
    margin: 12px;
    display: flex;

    .button {
      padding: 8px;
      flex-grow: 1;
      font-size: 0.8rem;
      text-align: center;
      border-radius: 8px;
      border: 1px solid rgba(#222, 0.1);
      box-shadow: 0 2px 4px rgba(#111, 0.05);
      color: rgba(#222, 0.7);
      cursor: pointer;

      &:hover {
        background: rgba(#222, 0.02);
        border: 1px solid rgba(#222, 0.2);
        box-shadow: 0 2px 4px rgba(#111, 0.1);
        color: rgba(#222, 1);
      }
    }
  }
}
</style>

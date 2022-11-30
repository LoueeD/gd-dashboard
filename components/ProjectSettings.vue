<script setup lang="ts">
const { projectScreens, sidebar } = useProject();
const canvas = ref(null);
const picker = ref(null);
const pickerPos = reactive({
  x: 30,
  y: 30,
  colour: '',
  dragging: false,
  get css() {
    return {
      cursor: this.dragging ? 'grabbing' : 'grab',
      transform: `translate3d(${this.x}px, ${this.y}px, 0)`,
      background: this.colour,
    };
  },
});

function pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return Math.round(theta);
}

function mousedown(e: MouseEvent) {
  e.preventDefault();
  pickerPos.dragging = true;
  const { width, height } = picker.value.getBoundingClientRect();
  console.log(e, pickerPos);
  const { clientX, clientY } = e;
  let cache = { ...pickerPos };
  const mousemove = (me: MouseEvent) => {
    me.preventDefault();
    const { clientX: mx, clientY: my } = me;
    pickerPos.x = Math.max(0, Math.min(width, cache.x + (mx - clientX)));
    pickerPos.y = Math.max(0, Math.min(height, cache.y + (my - clientY)));
    const ang = angle(pickerPos.x, pickerPos.y, width / 2, height / 2);
    pickerPos.colour = `hsl(${ang}, 50%, 50%)`;
    sidebar.value.background = pickerPos.colour;
  };
  const mouseup = () => {
    pickerPos.dragging = false;
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
    <div class="colour">
      <div class="colour__picker" ref="picker">
        <canvas ref="canvas"></canvas>
        <div class="dot" @mousedown="mousedown" :style="pickerPos.css"></div>
      </div>
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
  height: 400px;
  padding: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 10px 10px 20px rgba(#111, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #fff;

  .title {
    font-size: 0.9rem;
    margin: 12px 0;
  }

  .colour {
    &__picker {
      position: relative;
      aspect-ratio: 1/1;
      border: 1px solid rgba(#222, 0.05);
      border-radius: 8px;

      canvas {
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
  }
}
</style>

<script setup lang="ts">
const { projectScreens, sidebar } = useProject();
const canvas = ref(null);
const picker = ref(null);

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
  // canvas.value.width = picker.value.clientWidth;
  // canvas.value.height = picker.value.clientHeight;
  // const ctx = setupCanvas(canvas.value);
  // if (ctx) {
  //   for (let i = 0; i < 200; i = i + 10) {
  //     ctx.fillRect(i, 10, 1, 1);
  //   }
  //   ctx.fill();
  // }
});
</script>

<template>
  <div class="project-settings">
    <div class="colour">
      <div class="colour__picker" ref="picker">
        <canvas ref="canvas"></canvas>
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
      aspect-ratio: 1/1;
      border: 1px solid rgba(#222, 0.1);
      border-radius: 8px;
    }
  }
}
</style>

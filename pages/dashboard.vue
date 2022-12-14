<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
const dashboardRef = ref(null);
const canvasRef = ref(null);
const ctx = ref(null);
const router = useRouter();
const mouse = reactive({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  reset() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  },
  get css() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      transform: `translate3d(${this.x}px, ${this.y}px, 0)`,
    };
  },
});
const blocks = ref([]);
const cssBlocks = computed(() => {
  let obj = {};
  blocks.value.forEach((item, index) => {
    obj[index] = {
      width: `${item.width}px`,
      height: `${item.height}px`,
      transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
    };
  });
  return obj;
});

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

function mousedown(e: MouseEvent, block) {
  e.preventDefault();
  console.log(e, block);
  const { top, left } = dashboardRef.value.getBoundingClientRect();
  const { clientX, clientY } = e;
  const rnd = (n: number) => Math.ceil((n - 10) / 20) * 20;
  let blockCache = null;
  if (!block) {
    mouse.x = rnd(clientX - left);
    mouse.y = rnd(clientY - top);
  } else {
    blockCache = { ...block };
  }
  const mousemove = (me: MouseEvent) => {
    me.preventDefault();
    const { clientX: mx, clientY: my } = me;
    if (!block) {
      mouse.width = rnd(mx - clientX);
      mouse.height = rnd(my - clientY);
    } else {
      console.log(block.x, block.y);
      block.x = blockCache.x + rnd(mx - clientX);
      block.y = blockCache.y + rnd(my - clientY);
    }
  };
  const mouseup = () => {
    if (!block) {
      blocks.value.push({ ...mouse });
    }
    mouse.reset();
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  };
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
}

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
});

const DoughnutChartData = {
  labels: ['Paris', 'N??mes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
};

function routeToChart() {
  router.push({
    name: 'dashboard-chart-chartName',
    params: {
      chartName: 'my-first-chart',
    },
  });
}

onMounted(() => {
  canvasRef.value.width = dashboardRef.value.clientWidth + 300;
  canvasRef.value.height = dashboardRef.value.clientHeight + 1000;
  ctx.value = setupCanvas(canvasRef.value);
  if (!ctx.value) return;
  ctx.value.beginPath();
  ctx.value.strokeStyle = '#e7e7e7';
  for (let i = -1; i < 10000; i += 20) {
    ctx.value.moveTo(0, i);
    ctx.value.lineTo(canvasRef.value.width, i);
  }
  for (let i = -1; i < 6000; i += 20) {
    ctx.value.moveTo(i, 0);
    ctx.value.lineTo(i, canvasRef.value.height);
  }
  ctx.value.fill();
  ctx.value.stroke();
});
</script>

<template>
  <ProjectWrapper>
    <div class="dashboard" ref="dashboardRef" @mousedown="mousedown">
      <canvas ref="canvasRef"></canvas>
      <div class="blocks">
        <div
          class="block"
          v-for="(b, index) in blocks"
          :style="cssBlocks[index]"
          @mousedown.stop="mousedown($event, b)"
          @click="routeToChart(b)"
        >
          <DoughnutChart :chartData="DoughnutChartData" :options="options" />
        </div>
      </div>
      <div class="block" :style="mouse.css"></div>
    </div>
    <router-view :chartData="DoughnutChartData" :chartOptions="options" />
  </ProjectWrapper>
</template>

<style lang="scss" scoped>
.dashboard {
  position: relative;
  background: #fff;
  overflow: auto;
  flex: 1;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .block {
    position: absolute;
    top: -1px;
    left: -1px;
    background: #fff;
    box-shadow: inset 0 0 0 1px rgba(#111, 0.2), 5px 5px 0 1px rgba(#111, 0.08);
    overflow: clip;
  }
}
</style>

<template>
  <div class="chart-insights">
    <div class="chart-insights__overlay">
      <RouterLink :to="{ name: 'dashboard' }" />
    </div>
    <div class="chart-insights__modal">
      <div class="chart">
        <div class="chart-inner">
          <DoughnutChart
            :chartData="chartData"
            :options="chartOptions"
            :style="{ 'max-height': 'unset' }"
          />
        </div>
        <span class="link">View as Search Filter</span>
      </div>
      <div class="data-table">
        <div class="data-table__inner">
          <InlineTable :header="table.header" :rows="table.rows" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3';
defineProps({
  chartData: Object,
  chartOptions: Object,
});

const { records } = useRecords();

const table = ref({
  header: [
    { value: 'Icon' },
    { value: 'ID' },
    { value: 'First Name' },
    { value: 'Last Name' },
    { value: 'Email' },
    { value: 'Job Title' },
  ],
  rows: records.value.map((item, i) => {
    return {
      rowId: i,
      cells: [
        { value: 'https://picsum.photos/100?' + i, type: 'icon' },
        { value: item.ID },
        { value: item.firstName },
        { value: item.lastName },
        { value: item.email },
        { value: item.jobTitle },
      ],
    };
  }),
});
</script>

<style lang="scss" scoped>
.chart-insights {
  position: fixed;
  inset: 0;
  justify-content: center;
  display: flex;
  z-index: 9999;

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(#111, 0.6);
    display: flex;

    a {
      flex: 1;
    }
  }

  &__modal {
    position: relative;
    margin: auto;
    max-width: 1400px;
    height: calc(100vh - 120px);
    // width: calc(100% - 120px);
    border-radius: 12px;
    background: #fff;
    flex-direction: column;
    display: flex;
    overflow: clip;

    .chart {
      position: relative;
      padding: 15px;
      border-bottom: 1px solid rgba(#111, 0.1);

      &::before {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 20px;
        background: linear-gradient(rgba(#111, 0), rgba(#111, 0.05));
        content: '';
      }

      .link {
        position: absolute;
        margin: 10px;
        right: 0;
        bottom: 0;
        color: #fff;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 8px 16px;
        background: #418bd9;
        border-radius: 40px;
        cursor: pointer;
        display: block;
      }
    }

    .data-table {
      min-height: 0;
      display: flex;

      &__inner {
        margin: 0 auto;
        min-height: 0;
        overflow: auto;
        display: flex;

        :deep(.inline-table) {
          margin: auto;
          overflow: visible;
          flex-grow: 1;
        }
      }
    }
  }
}
</style>

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

        <RouterLink
          class="close"
          :to="{ name: 'dashboard' }"
          v-html="getIcon('x')"
        />
      </div>
      <div class="tools">
        <SearchHeader />
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

const { getIcon } = useIcon();
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
    height: calc(100vh - 120px);
    max-width: calc(100% - 120px);
    border-radius: 12px;
    background: #fff;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    overflow: auto;

    .chart {
      position: relative;
      padding: 0 15px 15px;
      width: 100%;
      position: sticky;
      left: 0;
      // border-bottom: 1px solid rgba(#111, 0.1);

      &::before {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 10px;
        background: linear-gradient(rgba(#111, 0), rgba(#111, 0.03));
        // content: '';
      }

      .chart-inner {
        margin: auto;
        max-width: 340px;
      }

      .close {
        position: absolute;
        margin: 10px;
        top: 0;
        right: 0;
        width: 28px;
        height: 28px;
        padding: 6px;
        color: #418bd9;
        border-radius: 8px;
        background: rgba(#418bd9, 0.1);
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }

    .tools {
      width: 100%;
      position: sticky;
      left: 0;

      &:deep(.search-header) {
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        display: none;
      }

      .link {
        position: absolute;
        margin: auto;
        right: 0px;
        // top: 0;
        bottom: 10px;
        color: #fff;
        font-size: 0.8rem;
        padding: 0 12px;
        height: 30px;
        color: #fff;
        background: rgba(#418bd9, 1);
        border-radius: 8px;
        align-items: center;
        cursor: pointer;
        display: flex;
      }
    }

    .data-table {
      min-height: 0;
      // padding: 20px 40px;

      // display: flex;

      &__inner {
        margin: 0 auto;
        min-height: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        // border-radius: 6px;
        // overflow: hidden;
        display: flex;

        :deep(.inline-table) {
          margin: auto;
          // margin-right: -1px;
          border-radius: 6px;
          overflow: visible;
          flex-grow: 1;
        }
      }
    }
  }
}
</style>

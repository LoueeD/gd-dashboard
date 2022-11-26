<script setup lang="ts">
defineProps({
  header: {
    type: Array as PropType<{ value: string }[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<{ rowId: string; cells: { value: string }[] }[]>,
    required: true,
  },
});
</script>

<template>
  <div class="inline-table">
    <div class="row row--header">
      <div class="cell" v-for="cell in header">
        {{ cell.value }}
      </div>
    </div>
    <div class="row" v-for="row in rows">
      <div class="cell" v-for="cell in row.cells">
        {{ cell.value }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inline-table {
  .row {
    display: flex;

    .cell {
      min-width: 220px;
      border: solid rgba(#111, 0.1);
      border-width: 0 1px 1px 0;
      padding: 10px;
    }
  }
}
</style>

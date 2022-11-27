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
      <div class="select"></div>
      <div class="cell" v-for="(cell, index) in header" :data-index="index">
        {{ cell.value }}
      </div>
      <div class="options"></div>
    </div>
    <div class="row" v-for="row in rows">
      <div class="select"><span /></div>
      <div class="cell" v-for="(cell, index) in row.cells" :data-index="index">
        <img
          class="icon"
          v-if="cell.type === 'icon'"
          :src="cell.value"
          alt=""
        />
        <template v-else>
          {{ cell.value }}
        </template>
      </div>
      <div class="options"><span /><span /><span /></div>
    </div>
    <div class="paging"></div>
  </div>
</template>

<style lang="scss" scoped>
.inline-table {
  flex-grow: 1;
  overflow: auto;
  .paging {
    position: sticky;
    bottom: 0;
    left: 0;
    background: #fff;
    flex-shrink: 0;
    height: 40px;
    border-top: 1px solid rgba(#111, 0.1);
  }
  .row {
    font-size: 0.9rem;
    padding-right: 60px;
    justify-content: flex-start;
    display: flex;

    &--header {
      position: sticky;
      top: 0;
      font-size: 0.9rem;
      color: rgba(#111, 0.6);
      z-index: 2;

      .cell,
      .select,
      .options {
        background: #fff;
      }
    }

    .select,
    .options {
      width: 40px;
      flex-shrink: 0;
      border: solid rgba(#111, 0.1);
      border-width: 0 1px 1px 0;
      justify-content: center;
      align-items: center;
      display: flex;
    }

    .select {
      span {
        width: 20px;
        height: 20px;
        border: 1px solid rgba(#111, 0.1);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          border: 1px solid rgba(#111, 0.2);
          box-shadow: 0 1px 2px rgba(#111, 0.2);
        }
      }
    }

    .options {
      width: 26px;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;

      span {
        width: 4px;
        height: 4px;
        background: rgba(#111, 0.3);
        border-radius: 4px;
      }

      &:hover {
        background: rgba(#111, 0.05);
      }
    }

    .cell {
      min-width: 220px;
      border: solid rgba(#111, 0.1);
      border-width: 0 1px 1px 0;
      padding: 10px;

      .icon {
        margin: -6px auto -10px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        box-shadow: 0 0 0 1px rgba(#111, 0.1);
        display: block;
      }

      &[data-index='0'] {
        min-width: 55px;
        text-align: center;
      }

      &[data-index='1'] {
        min-width: 70px;
      }

      &[data-index='2'] {
        min-width: 130px;
      }

      &[data-index='3'] {
        min-width: 160px;
      }

      &[data-index='4'] {
        min-width: 280px;
      }

      &[data-index='5'] {
        min-width: 320px;
      }
    }
  }
}
</style>

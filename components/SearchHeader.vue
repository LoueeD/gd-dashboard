<script setup lang="ts">
const { getIcon } = useIcon();
</script>

<template>
  <div class="search-header">
    <div class="regional-search">
      <input type="text" placeholder="Search ..." />
      <span class="icon" v-html="getIcon('search')"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-header {
  height: 53px;
  border-bottom: 1px solid rgba(#111, 0.1);
  flex-shrink: 0;
  align-items: center;
  display: flex;

  .regional-search {
    position: relative;
    margin: 8px;

    input {
      width: 200px;
      height: 38px;
      padding: 0 12px 0 38px;
      border-radius: 8px;
      border: 1px solid rgba(#111, 0);
      transition: 150ms ease-in-out;
      font-family: inherit;
      font-weight: 400;
      font-size: 0.9rem;
      outline: 0;

      &:focus {
        border: 1px solid rgba(#111, 0.15);
        padding-left: 42px;

        ~ .icon {
          left: 10px;
          color: darken(#cbcbcb, 20%);
        }
      }
    }

    .icon {
      position: absolute;
      margin: auto;
      top: 0;
      left: 6px;
      bottom: 0;
      width: 22px;
      height: 22px;
      color: #cbcbcb;
      transition: 150ms ease-in-out;
      pointer-events: none;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
}
</style>

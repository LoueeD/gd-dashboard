<template>
  <div class="search-header">
    <div class="regional-search">
      <input type="text" placeholder="Search ..." />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-header {
  height: 63px;
  border-bottom: 1px solid rgba(#111, 0.1);
  flex-shrink: 0;
  align-items: center;
  display: flex;

  .regional-search {
    input {
      width: 140px;
      height: 38px;
      padding: 0 12px;
      font-family: inherit;
      font-size: 1rem;
      margin: 0 10px;
      border: 1px solid rgba(#111, 0.1);
      border-radius: 8px;
    }
  }
}
</style>

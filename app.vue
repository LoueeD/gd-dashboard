<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<style lang="scss">
*,
*:before,
*:after {
  margin: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  .app {
    height: 100vh;
    display: flex;
  }
}

.arrow--before,
.arrow--after,
.arrow--after-down,
.arrow--after-up {
  &::after {
    width: 8px;
    height: 8px;
    margin-left: 4px;
    border: solid rgba(#111, 1);
    border-width: 0 0 1px 1px;
    transform: rotate(45deg);
    content: '';
  }

  &.arrow-white::after {
    border-color: #fff;
  }
}
.arrow--after-down::after {
  margin: -4px 0 0 0;
  border-width: 0 1px 1px 0;
}
.arrow--after-up::after {
  margin: 4px 0 0 0;
  border-width: 1px 0 0 1px;
}
</style>

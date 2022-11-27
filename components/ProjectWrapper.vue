<template>
  <Sidebar />
  <main>
    <ProjectNav />
    <slot />
  </main>
  <OmniBox />
</template>

<style lang="scss">
main {
  flex-grow: 1;
  min-width: 0;
  flex-direction: column;
  display: flex;
}
</style>

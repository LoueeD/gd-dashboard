<script setup lang="ts">
const { projectScreens, sidebar } = useProject();
const sidebarRef = ref(null);
const sidebarWidth = ref(null);
const { omnibox } = useOmni();
const { getIcon } = useIcon();

onMounted(() => {
  sidebarWidth.value = sidebarRef.value?.clientWidth;
});
</script>

<template>
  <div class="sidebar-collapsed" :class="{ collapsed: sidebar.collapsed }">
    <div class="back">
      <img src="https://gridfox.com/assets/images/gridfox-icon.svg" />
    </div>
    <div class="screens">
      <a v-for="link in projectScreens" :href="link.route">
        <span class="icon" v-if="link.icon" v-html="getIcon(link.icon)"></span>
        <div class="label">{{ link.title }}</div>
      </a>
    </div>
  </div>
  <div
    class="sidebar"
    ref="sidebarRef"
    :style="{ '--width': sidebarWidth }"
    :class="{ collapsed: sidebar.collapsed }"
  >
    <div class="back">
      <img src="https://gridfox.com/assets/images/gridfox-icon.svg" />
      View All Projects
    </div>
    <div
      class="title"
      :class="{
        'arrow--after-down': !omnibox.visible,
        'arrow--after-up': omnibox.visible,
      }"
      @click="omnibox.visible = !omnibox.visible"
    >
      Sales CRM
    </div>
    <div class="sidebar__screens">
      <SidebarItems :items="projectScreens" :level="1" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  flex-shrink: 0;
  max-width: 290px;
  transition: 350ms ease-in-out;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  display: flex;

  &.collapsed {
    margin-left: calc(calc(var(--width) * -1px) - 2px);
  }

  .back {
    cursor: pointer;
    height: 60px;
    padding: 0 12px;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    align-items: center;
    display: flex;
    gap: 10px;

    img {
      width: 24px;
    }
  }

  .title {
    height: 38px;
    padding: 0 16px;
    font-size: 0.9rem;
    font-weight: 600;
    flex-shrink: 0;
    margin: 12px 12px 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 2px rgba(#111, 0.1);
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    display: flex;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 1px 3px rgba(#111, 0.15);
    }
  }

  &__screens {
    font-size: 0.9rem;
  }
}
.sidebar-collapsed {
  width: 60px;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  transition: 350ms ease-in-out;
  background: #fff;
  z-index: 1;

  &:not(.collapsed) {
    margin-left: -60px;
    pointer-events: none;
    opacity: 0;
  }

  .back {
    cursor: pointer;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    display: flex;

    img {
      width: 24px;
    }
  }

  .screens {
    padding: 8px;
    flex-direction: column;
    display: flex;

    a {
      position: relative;
      color: #333;
      border-radius: 100%;
      text-decoration: none;
      aspect-ratio: 1/1;
      justify-content: center;
      align-items: center;
      display: flex;

      .icon {
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        display: flex;

        svg {
          color: #444;
        }
      }

      .label {
        position: absolute;
        left: 100%;
        font-size: 0.8rem;
        border-radius: 6px;
        white-space: nowrap;
        padding: 5px 8px;
        transition: 150ms ease-in-out;
        background: linear-gradient(36deg, #0038b6, #003c7e);
        color: rgba(#fff, 1);
        pointer-events: none;
        opacity: 0;
      }
      &:hover .label {
        left: 105%;
        opacity: 1;
      }

      &:hover {
        background: rgba(#111, 0.05);
      }
    }
  }
}
</style>

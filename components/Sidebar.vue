<script setup lang="ts">
const { projectScreens, projectSettings, sidebar, sidebarColour } =
  useProject();
const sidebarRef = ref(null);
const { omnibox } = useOmni();
const { getIcon } = useIcon();

const links = ref([
  {
    route: '/editer',
    title: 'Edit This Screen',
    icon: 'edit',
    hideOptions: true,
    nested: [],
  },
  {
    action: () => {
      projectSettings.value.visible = !projectSettings.value.visible;
    },
    title: 'Project Settings',
    icon: 'settings',
    hideOptions: true,
    nested: [],
  },
  {
    route: '/new',
    title: 'New Screen',
    icon: 'plus-square',
    hideOptions: true,
    nested: [],
  },
  {
    route: '/templates',
    title: 'Browse Templates',
    icon: 'package',
    hideOptions: true,
    nested: [],
  },
  {
    route: '/import',
    title: 'Import Data',
    icon: 'upload',
    hideOptions: true,
    nested: [],
  },
]);

onMounted(() => {
  sidebar.value.width = sidebarRef.value?.clientWidth;
});
</script>

<template>
  <div
    class="sidebar-collapsed"
    :class="{ collapsed: sidebar.collapsed }"
    :style="{
      background: sidebarColour.background,
      '--color': sidebarColour.textColour,
    }"
  >
    <div class="back">
      <img
        v-if="sidebar.colour.background.l == 100"
        src="https://gridfox.com/assets/images/gridfox-icon.svg"
      />
      <GridfoxLogo v-else />
    </div>
    <div class="screens">
      <RouterLink v-for="link in projectScreens" :to="link.route">
        <span class="icon" v-if="link.icon" v-html="getIcon(link.icon)"></span>
        <div class="label">{{ link.title }}</div>
      </RouterLink>
    </div>
  </div>
  <div
    class="sidebar"
    ref="sidebarRef"
    :style="{
      '--sidebar-width': sidebar.width,
      '--color': sidebarColour.textColour,
      background: sidebarColour.background,
    }"
    :class="{ collapsed: sidebar.collapsed }"
  >
    <div class="back">
      <img
        v-if="sidebar.colour.background.l == 100"
        src="https://gridfox.com/assets/images/gridfox-icon.svg"
      />
      <GridfoxLogo v-else />
      All Projects
    </div>
    <!-- <div class="logo-divider" v-if="sidebar.logo"></div> -->
    <div class="logo" v-if="sidebar.logo">
      <img
        :src="sidebar.logo"
        alt="Project Logo"
        @click="projectSettings.visible = !projectSettings.visible"
      />
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
    <div class="sidebar__links">
      <div class="divider"></div>
      <SidebarItems :items="links" :level="1" />
    </div>
    <transition name="project-settings">
      <ProjectSettings v-if="projectSettings.visible" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  flex-shrink: 0;
  max-width: 290px;
  background: darken(#fff, 0%);
  transition: 350ms margin-left ease-in-out;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  overflow: auto;
  display: flex;
  z-index: 100;

  --color: 0, 0, 0;

  &.collapsed {
    margin-left: calc(calc(var(--sidebar-width) * -1px) - 2px);
  }

  .back {
    cursor: pointer;
    padding: 18px;
    font-size: 0.9rem;
    flex-shrink: 0;
    color: rgba(var(--color), 0.7);
    align-items: center;
    display: flex;
    gap: 16px;

    img,
    svg {
      width: 24px;
      margin-left: -4px;
    }
  }

  .logo-divider {
    margin: 0 12px 12px;
    border-top: 1px solid rgba(var(--color), 0.1);
  }

  .logo {
    border-radius: 4px;
    margin: 0 12px 12px;
    // border: 1px solid rgba(var(--color), 0.1);
    // box-shadow: 0 1px 2px rgba(var(--color), 0.05);
    max-width: calc(calc(var(--sidebar-width) * 1px) - 24px);
    justify-content: center;
    align-items: center;
    overflow: hidden;
    display: flex;

    img {
      width: 100%;
      display: block;
    }
  }

  .title {
    height: 34px;
    padding: 0 12px;
    font-size: 0.9rem;
    font-weight: 600;
    flex-shrink: 0;
    color: rgba(var(--color), 0.8);
    margin: 0 12px 8px;
    border: 1px solid rgba(var(--color), 0.08);
    border-radius: 6px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    display: flex;

    &.arrow--after-down::after,
    &.arrow--after-up::after {
      border-color: rgba(var(--color), 0.5);
    }

    &:hover {
      border: 1px solid rgba(var(--color), 0.2);
    }
  }

  &__screens {
    font-size: 0.9rem;
  }

  &__links {
    font-size: 0.9rem;

    .divider {
      margin: 8px 12px 12px;
      border-top: 1px solid rgba(var(--color), 0.1);
    }

    a {
      color: rgba(var(--color), 0.7);
      margin: 4px 0;
      border-radius: 6px;
      text-decoration: none;
      align-items: center;
      cursor: pointer;
      display: flex;

      .icon {
        width: 18px;
        height: 18px;
        margin-left: 8px;
        justify-content: center;
        align-items: center;
        display: flex;

        svg {
          color: rgba(var(--color), 1);
        }
      }

      .link-title {
        margin-left: 8px;
        padding: 4px 0;
      }
    }
  }

  .project-settings-enter-active,
  .project-settings-leave-active {
    transition: 0.35s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    transform-origin: left center;
  }

  .project-settings-enter-from,
  .project-settings-leave-to {
    transform: translate3d(20px, 0, 0);
    opacity: 0;
  }
}
.sidebar-collapsed {
  width: 60px;
  flex-shrink: 0;
  border-right: 1px solid rgba(var(--color), 0.1);
  transition: 350ms ease-in-out;
  background: #fff;
  z-index: 101;

  &:not(.collapsed) {
    margin-left: -60px;
    pointer-events: none;
    opacity: 0;
  }

  .back {
    cursor: pointer;
    height: 55px;
    padding: 6px 0 0;
    justify-content: center;
    flex-shrink: 0;
    display: flex;

    img,
    svg {
      width: 24px;
    }
  }

  .screens {
    padding: 8px;
    flex-direction: column;
    display: flex;
    gap: 6px;

    a {
      position: relative;
      color: rgba(var(--color), 0.8);
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
          color: rgba(var(--color), 1);
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

      &:hover,
      &.router-link-exact-active {
        background: rgba(var(--color), 0.05);
      }
    }
  }
}
</style>

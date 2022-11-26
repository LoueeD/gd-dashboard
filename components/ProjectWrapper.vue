<script setup lang="ts">
import feather from 'feather-icons';

const omniBox = reactive({
  visible: false,
});
const screenList = reactive([
  {
    route: '/',
    icon: 'trello',
    title: 'Deals Board',
    nested: [],
    active: true,
  },
  { route: '/', icon: 'briefcase', title: 'Companies', nested: [] },
  { route: '/', icon: 'users', title: 'Contacts', nested: [] },
  {
    route: '/',
    icon: 'book',
    title: 'Deals',
    nested: [
      { route: '/', icon: 'search', title: 'Qualifying', nested: [] },
      { route: '/', icon: 'search', title: 'Proposal Required', nested: [] },
      { route: '/', icon: 'search', title: 'Under Review', nested: [] },
      { route: '/', icon: 'search', title: 'Awaiting Start', nested: [] },
    ],
  },
  { route: '/', icon: 'pie-chart', title: 'Sales Overview', nested: [] },
]);

const getIcon = (icon) => {
  if (!feather.icons[icon]) return;
  return feather.icons[icon].toSvg();
};
</script>

<template>
  <div class="sidebar">
    <div class="back arrow--before">Back to Projects</div>
    <div
      class="title arrow--after-down"
      @click="omniBox.visible = !omniBox.visible"
    >
      Sales CRM
    </div>
    <div class="sidebar__screens">
      <SidebarItems :items="screenList" :level="1" />
    </div>
  </div>
  <main>
    <nav></nav>
  </main>
  <div class="omni" v-if="omniBox.visible">
    <div class="backdrop" @click="omniBox.visible = !omniBox.visible"></div>
    <div class="omni__box">
      <div class="search">
        <input type="text" placeholder="Search all projects ..." />
        <span class="icon" v-html="getIcon('search')"></span>
      </div>
      <div class="results">
        <div class="title">Current Project - Sales CRM</div>
        <SidebarItems :items="screenList" />
        <div class="gutter"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  display: flex;

  .back {
    cursor: pointer;
    font-size: 0.9rem;
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 12px;
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .arrow--before::before,
  .arrow--after::after,
  .arrow--after-down::after {
    width: 8px;
    height: 8px;
    margin-left: 4px;
    border: solid rgba(#111, 1);
    border-width: 0 0 1px 1px;
    transform: rotate(45deg);
    content: '';
  }
  .arrow--after-down::after {
    margin: -4px 0 0 0;
    border-width: 0 1px 1px 0;
  }

  .title {
    height: 38px;
    padding: 0 16px;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  &__screens {
    font-size: 0.9rem;
  }
}

main {
  flex-grow: 1;
  flex-direction: column;
  display: flex;

  nav {
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.omni {
  position: fixed;
  inset: 0;
  display: flex;

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(#111, 0.2);
  }

  &__box {
    position: relative;
    margin: auto;
    max-width: 640px;
    max-height: 380px;
    background: #fff;
    height: calc(100% - 60px);
    width: calc(100% - 60px);
    box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    flex-direction: column;
    display: flex;

    .search {
      position: relative;
      margin: 12px;
      input {
        border: 0;
        width: 100%;
        height: 50px;
        padding: 0 14px 0 46px;
        font-family: inherit;
        font-size: 1rem;
        background: rgba(#111, 0.05);
        border-radius: 10px;
        outline: 0;
      }
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        color: #666;
        aspect-ratio: 1/1;
        justify-content: center;
        align-items: center;
        display: flex;

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .results {
      flex-grow: 1;
      overflow: auto;

      .title {
        margin: 0 12px 12px;
        font-size: 0.9rem;
        color: #666;
      }

      .gutter {
        height: 12px;
        flex-shrink: 1;
      }

      &::-webkit-scrollbar {
        width: 14px;
        height: 18px;
      }

      &::-webkit-scrollbar-thumb {
        height: 6px;
        border: 4px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 7px;
        box-shadow: inset -1px -1px 0 rgba(0, 0, 0, 0.05),
          inset 1px 1px 0 rgba(0, 0, 0, 0.05);
      }

      &::-webkit-scrollbar-button {
        display: none;
        width: 0;
        height: 0;
      }

      &::-webkit-scrollbar-corner {
        background-color: transparent;
      }
    }
  }
}
</style>

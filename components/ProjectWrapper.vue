<script setup lang="ts">
import feather from 'feather-icons';
const { projectScreens, sidebar } = useProject();
const { getIcon } = useIcon();
const { omnibox } = useOmni();
const sidebarRef = ref(null);
const sidebarWidth = ref(null);
const table = ref({
  header: [
    { value: 'First Name' },
    { value: 'Last Name' },
    { value: 'Sector' },
    { value: 'Company' },
  ],
  rows: [
    {
      rowId: '1',
      cells: [
        { value: 'Louis' },
        { value: 'Dickinson' },
        { value: 'Software' },
        { value: 'FYHGT' },
      ],
    },
    {
      rowId: '2',
      cells: [
        { value: 'Louis' },
        { value: 'Dickinson' },
        { value: 'Software' },
        { value: 'JYONJ' },
      ],
    },
  ],
});
onMounted(() => {
  sidebarWidth.value = sidebarRef.value?.clientWidth;
});
</script>

<template>
  <div
    class="sidebar"
    ref="sidebarRef"
    :style="{ '--width': sidebarWidth }"
    :class="{ collapsed: sidebar.collapsed }"
  >
    <div class="back arrow--before">Back to Projects</div>
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
  <main>
    <nav>
      <div
        class="collapse arrow--after"
        :class="{ active: sidebar.collapsed }"
        @click="sidebar.collapsed = !sidebar.collapsed"
      ></div>
      <div class="btn">Invite Users</div>
    </nav>
    <SearchHeader />
    <InlineTable :header="table.header" :rows="table.rows" />
  </main>
  <OmniBox />
</template>

<style lang="scss">
.sidebar {
  flex-shrink: 0;
  max-width: 290px;
  transition: 350ms ease-in-out;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  display: flex;

  &.collapsed {
    margin-left: calc(var(--width) * -1px);
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

main {
  flex-grow: 1;
  min-width: 0;
  flex-direction: column;
  display: flex;

  nav {
    height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    display: flex;

    .collapse {
      width: 32px;
      height: 32px;
      margin-right: 16px;
      border-radius: 6px;
      transition: 350ms ease-in-out;
      border: 1px solid rgba(#111, 0.1);
      box-shadow: 0 1px 2px rgba(#111, 0.1);
      justify-content: center;
      align-items: center;
      display: flex;
      cursor: pointer;

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(#111, 0.15);
      }

      &.active {
        transform: rotate(180deg);
      }
    }

    .btn {
      padding: 8px 10px;
      font-size: 0.8rem;
      border: 1px solid rgba(#111, 0.1);
      box-shadow: 0 1px 2px rgba(#111, 0.1);
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(#111, 0.15);
      }
    }
  }
}
</style>

<script setup lang="ts">
import feather from 'feather-icons';
const { projectScreens, sidebar } = useProject();
const { getIcon } = useIcon();
const { omnibox } = useOmni();
const { records } = useRecords();

const table = ref({
  header: [
    { value: 'Icon' },
    { value: 'ID' },
    { value: 'First Name' },
    { value: 'Last Name' },
    { value: 'Email' },
    { value: 'Job Title' },
  ],
  rows: records.value.map((item, i) => {
    return {
      rowId: i,
      cells: [
        { value: 'https://picsum.photos/100?' + i, type: 'icon' },
        { value: item.ID },
        { value: item.firstName },
        { value: item.lastName },
        { value: item.email },
        { value: item.jobTitle },
      ],
    };
  }),
});
</script>

<template>
  <Sidebar />
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
main {
  flex-grow: 1;
  min-width: 0;
  flex-direction: column;
  display: flex;

  nav {
    height: 60px;
    padding: 0 16px;
    flex-shrink: 0;
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

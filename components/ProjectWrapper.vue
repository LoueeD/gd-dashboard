<script setup lang="ts">
import feather from 'feather-icons';
const { projectScreens } = useProject();
const { getIcon } = useIcon();
const { omnibox } = useOmni();
</script>

<template>
  <div class="sidebar">
    <div class="back arrow--before">Back to Projects</div>
    <div
      class="title arrow--after-down"
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
      <div class="btn">Invite Users</div>
    </nav>
    <InlineTable
      :header="[
        { value: 'First Name' },
        { value: 'Last Name' },
        { value: 'Sector' },
      ]"
      :rows="[
        {
          rowId: '123',
          cells: [
            { value: 'Louis' },
            { value: 'Dickinson' },
            { value: 'Software' },
          ],
        },
      ]"
    />
  </main>
  <OmniBox />
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
    padding: 0 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    display: flex;

    .btn {
      padding: 8px 12px;
      font-size: 0.8rem;
      font-weight: 600;
      border: 1px solid rgba(#111, 0.1);
      box-shadow: 0 1px 2px rgba(#111, 0.1);
      border-radius: 6px;
      cursor: pointer;
    }
  }
}
</style>

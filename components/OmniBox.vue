<script setup lang="ts">
import { nextTick } from 'vue';
import { ProjectScreen } from '~~/models/ProjectScreen';

const { projectScreens, projects } = useProject();
const { omnibox } = useOmni();
const { getIcon } = useIcon();
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchTerm = ref('');
const arrowNavIndex = ref(0);

const hideScreenTitle = (title: string) => {
  const st = searchTerm.value;
  return title.toLowerCase().includes(st.toLowerCase());
};

const allProjects = computed(() =>
  projects.value
    .map((p) => {
      return { route: '/', icon: 'folder', title: p.name, nested: [] };
    })
    .filter((p) => hideScreenTitle(p.title))
);

const itemsFiltered = (items: ProjectScreen[]) => {
  const st = searchTerm.value;
  return items.filter((item) => {
    if (!st) return true;
    if (item.nested && item.nested.length) {
      item.nested = item.nested.filter((i) => hideScreenTitle(i.title));
      return hideScreenTitle(item.title) || !!item.nested.length;
    }
    return hideScreenTitle(item.title);
  });
};

const projectScreensFiltered = computed(() =>
  itemsFiltered(JSON.parse(JSON.stringify(projectScreens.value)), 0)
);

const arrowNav = (e) => {
  if (document.activeElement === searchInputRef.value) {
    if (e.key === 'ArrowDown') {
      arrowNavIndex.value += 1;
    } else if (e.key === 'ArrowUp') {
      arrowNavIndex.value -= 1;
    }
    arrowNavIndex.value = Math.max(0, arrowNavIndex.value);
  }
};

const keyboardToggleOmni = async (e) => {
  if (e.key === '/' && e.ctrlKey) {
    omnibox.value.visible = !omnibox.value.visible;
    if (omnibox.value.visible && searchInputRef.value) {
      searchInputRef.value.focus();
    }
  } else {
    arrowNav(e);
  }
};

watch(
  omnibox,
  () => {
    searchTerm.value = '';
  },
  { deep: true }
);

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyboardToggleOmni);
});

onMounted(() => {
  window.addEventListener('keydown', keyboardToggleOmni);
});
</script>

<template>
  <div class="omni" v-show="omnibox.visible">
    <div class="backdrop" @click="omnibox.visible = !omnibox.visible"></div>
    <div class="omni__box">
      <div class="search">
        <input
          type="text"
          ref="searchInputRef"
          v-model="searchTerm"
          placeholder="Search all projects ..."
        />
        <span class="icon" v-html="getIcon('search')"></span>
      </div>
      <div class="results">
        <div
          class="section"
          v-if="projectScreensFiltered.length && searchTerm.length"
        >
          <div class="title">Sales CRM</div>
          <SidebarItems :items="projectScreensFiltered" />
          <div class="gutter"></div>
        </div>
        <div class="section" v-if="allProjects.length">
          <div class="title">Projects</div>
          <SidebarItems :items="allProjects" />
          <div class="gutter"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    max-width: 680px;
    max-height: 420px;
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
      border-radius: 0 0 16px 16px;
      overflow: auto;

      .title {
        position: sticky;
        top: 0;
        background: #fff;
        padding: 4px 24px 10px;
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

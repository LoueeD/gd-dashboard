<script setup lang="ts">
import { nextTick } from 'vue';
const { projectScreens } = useProject();
const { omnibox } = useOmni();
const { getIcon } = useIcon();
const searchInputRef = ref<HTMLInputElement | null>(null);

const keyboardToggleOmni = async (e) => {
  if (e.key === '/' && e.ctrlKey) {
    omnibox.value.visible = !omnibox.value.visible;
    if (omnibox.value.visible && searchInputRef.value) {
      await nextTick();
      searchInputRef.value.focus();
    }
  }
};

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
          placeholder="Search all projects ..."
        />
        <span class="icon" v-html="getIcon('search')"></span>
      </div>
      <div class="results">
        <div class="title">Current Project - Sales CRM</div>
        <SidebarItems :items="projectScreens" />
        <div class="gutter"></div>
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

<script setup lang="ts">
import { PropType } from 'vue';

type SidebarItem = {
  route: string;
  title: string;
  icon?: string;
  active?: boolean;
  nested: SidebarItem[];
};
const props = defineProps({
  items: {
    type: Array as PropType<SidebarItem[]>,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
});

const { getIcon } = useIcon();
</script>

<template>
  <ul>
    <li :data-level="level" v-for="link in items">
      <a :class="{ active: link.active }" :href="link.route">
        <span class="icon" v-if="link.icon" v-html="getIcon(link.icon)"></span>
        <span class="title">{{ link.title }}</span>
        <div class="options"><span /><span /><span /></div>
      </a>
      <SidebarItems
        v-if="link.nested.length"
        :items="link.nested"
        :level="level + 1"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    &[data-level='2'] {
      padding-left: 12px;
    }

    a {
      color: #333;
      margin: 4px 12px;
      border-radius: 8px;
      text-decoration: none;
      align-items: center;
      display: flex;

      .icon {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        justify-content: center;
        align-items: center;
        display: flex;

        svg {
          color: #444;
        }
      }

      .title {
        flex-grow: 1;
        min-width: 0;
        margin: 0 12px;
        padding: 8px 0;
      }

      .options {
        width: 22px;
        align-self: stretch;
        flex-direction: column;
        border-radius: 0 8px 8px 0;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
        opacity: 0;
        gap: 3px;

        span {
          width: 4px;
          height: 4px;
          background: rgba(#111, 0.3);
          border-radius: 4px;
        }

        &:hover {
          background: rgba(#111, 0.05);
        }
      }

      &.active,
      &:hover {
        background: rgba(0, 0, 0, 0.04);

        .options {
          opacity: 1;
        }
      }
    }
  }
}
</style>

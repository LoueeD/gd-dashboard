<script setup lang="ts">
import { PropType } from 'vue';

type SidebarItem = {
  route: string;
  title: string;
  icon?: string;
  active?: boolean;
  nested: SidebarItem[];
};
defineProps({
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
        {{ link.title }}
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
      padding: 8px 12px;
      text-decoration: none;
      align-items: center;
      display: flex;
      gap: 12px;

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

      &.active,
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>

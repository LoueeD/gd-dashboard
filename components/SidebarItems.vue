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
      <component
        :is="link.route ? 'router-link' : 'span'"
        :class="{ active: link.active }"
        :to="link.route"
        @click="link.action"
      >
        <span class="icon" v-if="link.icon" v-html="getIcon(link.icon)"></span>
        <span class="title">{{ link.title }}</span>
        <div v-if="!link.hideOptions" class="options">
          <span /><span /><span />
        </div>
      </component>
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

    > a,
    > span {
      color: rgba(var(--color), 0.6);
      margin: 4px 12px;
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
      }

      .title {
        flex-grow: 1;
        min-width: 0;
        margin: 1px 8px 0;
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
          background: rgba(var(--color), 0.2);
          border-radius: 4px;
        }

        &:hover {
          background: rgba(var(--color), 0.05);

          span {
            background: rgba(var(--color), 0.4);
          }
        }
      }

      &.router-link-exact-active,
      &:hover {
        background: rgba(var(--color), 0.08);
        color: rgba(var(--color), 1);

        .options {
          opacity: 1;
        }
      }
    }
  }
}
</style>

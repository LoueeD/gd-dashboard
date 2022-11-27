<script setup lang="ts">
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
  <ProjectWrapper>
    <SearchHeader />
    <InlineTable :header="table.header" :rows="table.rows" />
  </ProjectWrapper>
</template>

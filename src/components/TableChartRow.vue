<template>
  <template v-for="(item, i) in this.tableChartList" :key="i">
    <tr class="table__content">
      <td v-if="item.id !== ''">{{ item.id }}</td>
      <td v-else>(empty)</td>
      <td>{{ item.cnt }}</td>
      <td>{{ item.depth }}</td>
    </tr>
    <TableChartRow :tableChartList="item.child" />
  </template>
</template>

<script>
export default {
  name: 'TableChartRow',
  props: {
    tableChartList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.table__content {
  font-size: 0.6rem;
}
</style>

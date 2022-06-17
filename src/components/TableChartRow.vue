<template>
  <template v-for="(item, i) in this.tableChartList" :key="i">
    <tr class="table__content">
      <td v-if="item.id !== ''" :style="{ paddingLeft: `${item.depth}rem` }">
        <span v-if="item.isOpened === false" @click="openChild(item)">
          <font-awesome-icon
            icon="fa-regular fa-circle-check"
            :style="{
              visibility: item.child.length !== 0 ? 'visible' : 'hidden',
            }"
          />
        </span>
        <span v-else @click="closeChild(item)">
          <font-awesome-icon
            icon="fa-solid fa-circle-check"
            :style="{
              visibility: item.child.length !== 0 ? 'visible' : 'hidden',
            }"
          />
        </span>
        <span class="table__id">{{ item.id }}</span>
      </td>
      <td v-else :style="{ paddingLeft: `${item.depth}rem` }">
        <span v-if="item.isOpened === false" @click="openChild(item)">
          <font-awesome-icon
            icon="fa-regular fa-circle-check"
            :style="{
              visibility: item.child.length !== 0 ? 'visible' : 'hidden',
            }"
          />
        </span>
        <span v-else @click="closeChild(item)">
          <font-awesome-icon
            icon="fa-solid fa-circle-check"
            :style="{
              visibility: item.child.length !== 0 ? 'visible' : 'hidden',
            }"
          />
        </span>
        <span class="table__id">(empty)</span>
      </td>
      <td>{{ item.cnt }}</td>
    </tr>
    <TableChartRow v-if="item.isOpened === true" :tableChartList="item.child" />
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
  methods: {
    openChild(item) {
      item.isOpened = true;
    },
    closeChild(item) {
      item.isOpened = false;
    },
  },
};
</script>

<style>
.table__content {
  font-size: 0.7rem;
}

.table__id {
  margin-left: 0.5rem;
}
</style>

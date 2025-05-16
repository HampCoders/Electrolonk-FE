<script>
import {Toolbar as PvToolbar, Button as PvButton, Card as PvCard, Tag} from 'primevue';

export default {
  name: "DataCardManagerComponent",
  components: {PvToolbar, PvButton, PvCard, Tag},
  inheritAttrs: false,
  props: {
    items: {type: Array, required: true},
    title: {type: Object, required: true}, // { singular: '', plural: '' }
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: []}
  },
  emits: ['new-item-requested','edit-item-requested','delete-item-requested','delete-selected-items-requested'],
  data() {
    return {
      selectedItems: []
    };
  },
  methods: {
    newItem() {
      this.$emit("new-item-requested");
    },
    confirmDeleteItem(item) {
      this.$confirm.require({
        message: `Are you sure you want to delete this ${this.title.singular}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',
        accept: () => this.$emit('delete-item-requested', item)
      });
    },
    editItem(item) {
      this.$emit('edit-item-requested', item);
    },
    toggleSelectItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index === -1) this.selectedItems.push(item);
      else this.selectedItems.splice(index, 1);
    }
  }
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-4">Manage {{ title.plural }}</h3>
    <pv-toolbar class="mb-4">
      <template #start>
        <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem"/>
      </template>
    </pv-toolbar>

    <div v-if="items.length" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <pv-card v-for="item in items" :key="item.id" class="shadow-lg">
        <template #title>
          {{ item.name || 'Unnamed Item' }}
        </template>
        <template #content>
          <ul v-if="dynamic">
            <li v-for="column in columns" :key="column.field">
              <strong>{{ column.header }}:</strong> {{ item[column.field] }}
            </li>
          </ul>
          <slot name="card-body" :item="item"/>
        </template>
        <template #footer>
          <pv-button icon="pi pi-check-square" outlined rounded class="mr-2"
                     @click="toggleSelectItem(item)"
                     :label="selectedItems.includes(item) ? 'Unselect' : 'Select'" />
          <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(item)"/>
          <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(item)"/>
        </template>
      </pv-card>
    </div>

    <div v-else class="text-center mt-10 text-gray-500">
      No {{ title.plural }} available.
    </div>
  </div>
</template>

<style scoped>
/* Optional scoped styles */
</style>

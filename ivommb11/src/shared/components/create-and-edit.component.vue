<script>
import {Button as PvButton, Dialog as PvDialog} from "primevue";
const defaultStyle = { width: '400px' };

export default {
  name: "create-and-edit",
  components: {PvButton, PvDialog},
  props: {
    entity: null,
    visible: Boolean(),
    entityName: '',
    edit: Boolean(),
    size:'default'
  },
  emits: ['cancel-action-requested', 'save-action-requested'],
  methods: {
    onCancel() {
      this.$emit('cancel-action-requested');
    },
    onSave() {
      this.$emit('save-action-requested', this.entity);
    },
    getHeaderTitle(){
      return `${this.edit ? 'Edit' : 'New' } ${this.entityName}`;
    },
    getSubmitLabel() {
      return `${this.edit ? 'Update' : 'Create'}`;
    },
    getDialogStyle(){
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? {width: '500px'} : dialogStyle;
      dialogStyle = this.size === 'large' ? {width: '900px'} : dialogStyle;
      return dialogStyle;
    }
  }
}
</script>

<template>
  <pv-dialog v-bind:visible="visible" :model="true" :style="getDialogStyle()" class="p-fluid" :header="entityName">
    <template #header>
      <div class="flex justify-content-start">
        <div>{{getHeaderTitle()}}</div>
      </div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-end">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave"/>
        <pv-button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel"/>
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>
<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
export default {
  name: "review-item-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: null,
    visible: false
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Review"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="userId">Usuario</label>
            <pv-input-text id="userId" v-model="item.userId" :class="{ 'p-invalid': submitted && !item.userId }"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="rating">Calificación</label>
            <pv-input-text id="rating" v-model="item.rating" :class="{ 'p-invalid': submitted && !item.rating }"/>
          </pv-float-label>
        </div>
        <div class="field mt-3">
          <pv-float-label>
            <label for="comment">Comentario</label>
            <pv-input-text id="comment" v-model="item.comment" :class="{ 'p-invalid': submitted && !item.comment }"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>




</template>

<style scoped>
</style>
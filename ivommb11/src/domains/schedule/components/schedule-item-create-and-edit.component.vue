<script>
import CreateAndEdit from "@/shared/components/create-and-edit.component.vue";
import { FloatLabel as PvFloatLabel, InputText as PvInputText } from "primevue";

export default {
  name: "schedule-item-create-and-edit.dialog",
  components: { PvInputText, PvFloatLabel, CreateAndEdit },
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
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Schedule"
      @cancel-action-requested="onCancelRequested"
      @save-action-requested="onSaveRequested"
  >
    <template #content>
      <div class="p-fluid">

        <!-- Datos generales -->
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Schedule Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'pv-invalid': submitted && !item.name }" />
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="date">Date</label>
            <pv-input-text id="date" v-model="item.date" placeholder="YYYY-MM-DD" />
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="time">Time</label>
            <pv-input-text id="time" v-model="item.time" placeholder="HH:MM" />
          </pv-float-label>
        </div>

        <!-- Datos del cliente -->
        <h4 class="mt-5 mb-2 text-primary">Client Info</h4>

        <div class="field">
          <pv-float-label>
            <label for="clientFirstName">First Name</label>
            <pv-input-text id="clientFirstName" v-model="item.clientFirstName" />
          </pv-float-label>
        </div>

        <div class="field mt-3">
          <pv-float-label>
            <label for="clientLastName">Last Name</label>
            <pv-input-text id="clientLastName" v-model="item.clientLastName" />
          </pv-float-label>
        </div>

        <div class="field mt-3">
          <pv-float-label>
            <label for="clientEmail">Email</label>
            <pv-input-text id="clientEmail" v-model="item.clientEmail" />
          </pv-float-label>
        </div>

        <!-- Datos del servicio -->
        <h4 class="mt-5 mb-2 text-primary">Service Info</h4>

        <div class="field">
          <pv-float-label>
            <label for="serviceName">Service Name</label>
            <pv-input-text id="serviceName" v-model="item.serviceName" />
          </pv-float-label>
        </div>

        <div class="field mt-3">
          <pv-float-label>
            <label for="serviceDescription">Description</label>
            <pv-input-text id="serviceDescription" v-model="item.serviceDescription" />
          </pv-float-label>
        </div>

        <!-- Componente eléctrico (simplificado) -->
        <h4 class="mt-5 mb-2 text-primary">Componente Usado</h4>

        <div class="field">
          <pv-float-label>
            <label for="componentName">Component Name</label>
            <pv-input-text id="componentName" v-model="item.componentName" />
          </pv-float-label>
        </div>

        <div class="field mt-3">
          <pv-float-label>
            <label for="componentModel">Component Model</label>
            <pv-input-text id="componentModel" v-model="item.componentModel" />
          </pv-float-label>
        </div>

      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.pv-invalid {
  border: 1px solid red;
}
</style>

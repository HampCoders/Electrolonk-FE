<script>
import { ScheduleItem } from "../model/schedule.entity.js"
import { ScheduleService } from "../services/schedule.service.js"
import DataManager from "@/shared/components/data-manager.component.vue";
import ScheduleItemCreateAndEditDialog from "../components/schedule-item-create-and-edit.component.vue";
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: "schedule-management",
  components: { ScheduleItemCreateAndEditDialog, DataManager,Card, Button },
  data() {
    return {
      title: { singular: "Schedule", plural: "Schedules" },
      schedules: [],
      schedule: new ScheduleItem({}),
      selectedSchedule: [],
      scheduleService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.schedules.findIndex(schedule => schedule.id === id);
    },
    onNewItem() {
      this.schedule = new ScheduleItem({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.schedule = new ScheduleItem(item);
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.schedule = { ...item };
      this.deleteSchedule();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedSchedule = selectedItems;
      this.deleteSelectedSchedule();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested', item);
      this.submitted = true;

      if (item.name && item.name.trim()) {
        this.schedule = item;

        if (item.id) {
          this.updateSchedule();
        } else {
          this.createSchedule();
        }

        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createSchedule() {
      this.scheduleService.create(this.schedule).then(response => {
        let schedule = new ScheduleItem(response.data);
        this.schedules.push(schedule);
        this.notifySuccessfulAction("Schedule Created");
      }).catch(error => console.error(error));
    },
    updateSchedule() {
      this.scheduleService.update(this.schedule.id, this.schedule).then(response => {
        let index = this.findIndexById(this.schedule.id);
        this.schedules[index] = new ScheduleItem(response.data);
        this.notifySuccessfulAction("Schedule Updated");
      }).catch(error => console.error(error));
    },
    deleteSchedule() {
      this.scheduleService.delete(this.schedule.id).then(() => {
        let index = this.findIndexById(this.schedule.id);
        this.schedules.splice(index, 1);
        this.notifySuccessfulAction("Schedule Deleted");
      }).catch(error => console.error(error));
    },
    deleteSelectedSchedule() {
      this.selectedSchedule.forEach((schedule) => {
        this.scheduleService.delete(schedule.id).then(() => {
          this.schedule = this.schedules.filter((t) => t.id !== this.schedule.id);
        });
      });
      this.notifySuccessfulAction("Schedule Deleted");
    }
  },
  created() {
    this.scheduleService = new ScheduleService();
    this.scheduleService.getAll().then(response => {
      if (Array.isArray(response.data)) {
        this.schedules = response.data.map(schedule => new ScheduleItem(schedule));
      } else {
        console.error("Expected array but got:", response.data);
      }
    });
  }
};
</script>

<template>
  <div class="w-full">
    <data-manager
        :title="title"
        :items="schedules"
        :use-cards="true"
        @new-item-requested="onNewItem"
        @edit-item-requested="onEditItem($event)"
        @delete-item-requested="onDeleteItem($event)"
        @delete-selected-items-requested="onDeleteSelectedItems($event)"
    >
      <template #custom-columns>
        <div class="grid w-full px-3">
          <div v-for="item in schedules" :key="item.id" class="col-12 md:col-6 lg:col-6 xl:col-4">
            <Card class="h-full shadow-2">
              <template #title>
                {{ item.name }} — {{ item.serviceName }}
              </template>

              <template #subtitle>
                Cliente: {{ item.clientFirstName }} {{ item.clientLastName }}
              </template>

              <template #content>
                <div class="card-content">
                  <p><strong>Fecha:</strong> {{ item.date }}</p>
                  <p><strong>Hora:</strong> {{ item.time }}</p>
                  <p><strong>Email Cliente:</strong> {{ item.clientEmail }}</p>
                  <p><strong>Descripción del Servicio:</strong> {{ item.serviceDescription }}</p>
                  <p><strong>Componente:</strong> {{ item.componentName }} ({{ item.componentModel }})</p>
                </div>
              </template>

              <template #footer>
                <div class="flex justify-content-end gap-2">
                  <Button icon="pi pi-pencil" label="Editar" class="p-button-sm p-button-info" @click="onEditItem(item)" />
                  <Button icon="pi pi-trash" label="Eliminar" class="p-button-sm p-button-danger" @click="onDeleteItem(item)" />
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </data-manager>

    <schedule-item-create-and-edit-dialog
        :edit="isEdit"
        :item="schedule"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)"
    />
  </div>
</template>

<style scoped>
.card-content p {
  word-break: break-word;
  white-space: pre-wrap;
}
</style>

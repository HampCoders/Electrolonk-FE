<template>
  <div class="surface-card p-4 border-round shadow-2 w-full">
    <div class="text-lg font-semibold mb-4 text-primary">Disponibilidades Registradas</div>

    <div v-if="schedules.length > 0" class="grid">
      <div v-for="schedule in schedules" :key="schedule.id" class="col-12 md:col-6 lg:col-4">
        <Card class="h-full shadow-2">
          <template #title>
            {{ schedule.name }} — {{ schedule.serviceName }}
          </template>

          <template #subtitle>
            Cliente: {{ schedule.clientFirstName }} {{ schedule.clientLastName }}
          </template>

          <template #content>
            <p><strong>Empresa:</strong> {{ schedule.company }}</p>
            <p><strong>Distrito:</strong> {{ schedule.district }}</p>
            <p><strong>Fecha:</strong> {{ schedule.date }}</p>
            <p><strong>Hora:</strong> {{ schedule.time }}</p>
            <p><strong>Email Cliente:</strong> {{ schedule.clientEmail }}</p>
            <p><strong>Descripción del Servicio:</strong> {{ schedule.serviceDescription }}</p>
            <p><strong>Componente:</strong> {{ schedule.componentName }} ({{ schedule.componentModel }})</p>
          </template>

          <template #footer>
            <div class="flex justify-content-end gap-2">
              <Button icon="pi pi-pencil" label="Editar" class="p-button-sm p-button-info" @click="editar(schedule)" />
              <Button icon="pi pi-trash" label="Eliminar" class="p-button-sm p-button-danger" @click="eliminar(schedule.id)" />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <p v-else class="text-white">No hay disponibilidades registradas.</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getAllSchedules, deleteSchedule } from '@/domains/schedule/services/schedule.service';

import Card from 'primevue/card';
import Button from 'primevue/button';

const schedules = ref([]);
const emit = defineEmits(['editar']);

const loadSchedules = async () => {
  try {
    schedules.value = await getAllSchedules();
  } catch (error) {
    console.error('Error cargando horarios:', error);
  }
};

const eliminar = async (id) => {
  try {
    await deleteSchedule(id);
    await loadSchedules();
  } catch (err) {
    console.error('Error al eliminar:', err);
  }
};

const editar = (item) => {
  emit('editar', item);
};

onMounted(() => {
  loadSchedules();
});

defineExpose({ loadSchedules });
</script>

.card-content p {
margin: 0.2rem 0;
}

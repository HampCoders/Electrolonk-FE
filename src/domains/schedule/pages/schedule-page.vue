<template>
  <div class="p-4">
    <div class="surface-card p-4 border-round shadow-2 w-full mb-4">
      <div class="flex justify-content-between align-items-center">
        <h2 class="text-xl font-bold text-primary">Gestión de Agenda</h2>
        <button
            v-if="!showForm"
            type="button"
            class="custom-btn"
            @click="abrirFormulario(null)"
        >
          <i class="pi pi-plus mr-2"></i> Registrar Nueva
        </button>
      </div>
    </div>

    <!-- FORMULARIO -->
    <p v-if="showForm" class="text-white bg-blue-500 p-2">Formulario debería verse aquí ✅</p>
    <schedule-form

        v-if="showForm"
        :initialData="formData"
        :isEditing="modoEdicion"
        @cancelar="cerrarFormulario"
        @guardado="handleGuardado"
    />

    <!-- LISTADO -->
    <schedule-list @editar="abrirFormulario" ref="listaRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ScheduleList from '@/domains/schedule/components/schedule-list.vue';
import { ScheduleItem } from '@/domains/schedule/model/schedule.entity';

const showForm = ref(false);
const modoEdicion = ref(false);
const formData = ref(null);
const listaRef = ref(null);

// ✅ Cuando se hace clic en "Registrar Nueva" o en "Editar"
const abrirFormulario = (item) => {
  console.log('Abriendo formulario', item);
  showForm.value = true;
  console.log('showForm ahora es', showForm.value);
  modoEdicion.value = !!item;
  formData.value = item
      ? new ScheduleItem(item.id, item.name, item.date, item.time, item.company, item.district)
      : new ScheduleItem(null, '', '', '', '', '');
};

const cerrarFormulario = () => {
  showForm.value = false;
  modoEdicion.value = false;
};

const handleGuardado = () => {
  cerrarFormulario();
  listaRef.value?.loadSchedules();
};
</script>

<style scoped>
.custom-btn {
  background-color: #1976d2;
  color: #ffffff;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease;
}
.custom-btn:hover {
  background-color: #1565c0;
}
</style>

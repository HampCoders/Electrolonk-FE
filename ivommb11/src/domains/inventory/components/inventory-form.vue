<template>
  <div class="surface-card p-4 shadow-2 border-round w-full mb-4">
    <div class="text-2xl font-bold mb-3 text-primary">Registrar Servicio</div>

    <div class="formgrid grid mb-3">
      <div class="field col-12">
        <label for="name" class="font-medium">Nombre del Servicio</label>
        <InputText id="name" v-model="inventory.serviceName" class="w-full" />
      </div>

      <div class="field col-12 md:col-10">
        <label for="component" class="font-medium">Componente Eléctrico</label>
        <InputText id="component" v-model="currentComponent" class="w-full" @keyup.enter="addComponent" />
      </div>

      <div class="field col-12 md:col-2 flex align-items-end">
        <Button
            label="Agregar"
            icon="pi pi-plus"
            class="w-full bg-primary border-none"
            @click="addComponent"
        />
      </div>

      <div class="col-12">
        <div class="flex flex-wrap gap-2">
          <Chip
              v-for="(comp, index) in inventory.components"
              :key="index"
              :label="comp"
              class="bg-primary text-white"
              removable
              @remove="removeComponent(index)"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-content-end">
      <Button
          label="Guardar"
          icon="pi pi-check"
          class="bg-primary border-none text-white"
          @click="submitForm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { InventoryItem } from '@/domains/inventory/model/inventory.entity';
import { createInventory } from '@/domains/inventory/services/inventory.service';

const emit = defineEmits(['registro-creado']);

const inventory = ref(new InventoryItem(null, '', []));
const currentComponent = ref('');

const addComponent = () => {
  if (currentComponent.value.trim() !== '') {
    inventory.value.components.push(currentComponent.value.trim());
    currentComponent.value = '';
  }
};

const removeComponent = (index) => {
  inventory.value.components.splice(index, 1);
};

const submitForm = async () => {
  try {
    await createInventory(inventory.value);
    inventory.value = new InventoryItem(null, '', []);
    emit('registro-creado');
  } catch (err) {
    console.error('Error al guardar servicio:', err);
  }
};
</script>

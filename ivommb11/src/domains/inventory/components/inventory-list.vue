<template>
  <div class="surface-card p-4 shadow-2 border-round w-full">
    <div class="text-2xl font-bold mb-3 text-primary">Servicios Registrados</div>

    <DataTable :value="inventoryItems" stripedRows responsiveLayout="scroll">
      <Column field="serviceName" header="Servicio" />
      <Column header="Componentes">
        <template #body="slotProps">
          <div class="flex flex-wrap gap-2">
            <Chip
                v-for="(comp, i) in slotProps.data.components"
                :key="i"
                :label="comp"
                class="bg-primary text-white"
            />
          </div>
        </template>
      </Column>
      <Column header="Acciones" style="width: 8rem">
        <template #body="slotProps">
          <Button
              icon="pi pi-trash"
              severity="danger"
              class="p-button-sm"
              @click="deleteItem(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInventory, deleteInventory } from '@/domains/inventory/services/inventory.service';

const inventoryItems = ref([]);

const loadInventory = async () => {
  try {
    const res = await getInventory();
    inventoryItems.value = res.data;
  } catch (error) {
    console.error('Error al cargar inventario:', error);
  }
};

const deleteItem = async (id) => {
  try {
    await deleteInventory(id);
    await loadInventory();
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
  }
};

onMounted(() => {
  loadInventory();
});

// Permitir que inventory-view use esta función también
defineExpose({ loadInventory });
</script>

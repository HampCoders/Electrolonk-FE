<template>
  <div class="p-4">
    <inventory-form @registro-creado="recargarLista" />
    <inventory-list ref="listaRef" />
  </div>
</template>

<script setup>
import InventoryForm from '@/domains/inventory/components/inventory-form.vue';
import InventoryList from '@/domains/inventory/components/inventory-list.vue';
import { ref } from 'vue';

const listaRef = ref(null);

const recargarLista = () => {
  if (listaRef.value?.loadInventory) {
    listaRef.value.loadInventory();
  }
};
</script>

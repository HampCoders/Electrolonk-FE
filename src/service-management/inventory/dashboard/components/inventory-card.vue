<template>
  <div class="surface-card p-4 border-round shadow-2 w-full">
    <div class="text-lg font-semibold mb-3 text-primary">Gestión de Inventario</div>
    <router-link to="/inventory" class="custom-btn">
      <i class="pi pi-box mr-2"></i> Ver Inventario
    </router-link>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToInventory = () => router.push('/inventory');
</script>

<style scoped>
.dashboard-btn {
  background-color: #1976d2 !important;
  color: #ffffff !important;
  border: none;
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
.dashboard-btn:hover {
  background-color: #1565c0 !important;
  color: #ffffff !important;
}

.custom-btn {
  display: inline-flex;
  align-items: center;
  background-color: #1976d2;
  color: #ffffff;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.custom-btn:hover {
  background-color: #1565c0;
  color: #ffffff;
}

</style>

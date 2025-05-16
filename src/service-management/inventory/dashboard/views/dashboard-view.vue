<template>
  <div class="p-4">
    <div class="text-2xl font-bold text-primary mb-4">Panel de Control</div>

    <div class="grid gap-4 md:grid-cols-2">
      <inventory-card />
      <schedule-card />
    </div>
  </div>
</template>

<script setup>
import InventoryCard from '@/service-management/inventory/dashboard/components/inventory-card.vue';
import ScheduleCard from '@/service-management/inventory/dashboard/components/schedule-card.vue';
</script>

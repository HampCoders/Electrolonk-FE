<script>
import LanguageSwitcher from "@/public/components/language-switcher.vue";
import FooterContent from "@/public/components/footer-content.vue";

export default {
  name: "App",
  components: {
    LanguageSwitcher,
    FooterContent,
  },
  data() {
    return {
      drawer: false,
      items: [
        { label: "Inicio", to: "/home", icon: "pi pi-home" },
        { label: "Acerca de", to: "/about", icon: "pi pi-info-circle" },
        { label: "Registrar Técnico", to: "/registro-tecnico", icon: "pi pi-user-plus" },
        { label: "Buscar por IP", to: "/buscar-ip", icon: "pi pi-map-marker" },
        { label: "Reviews", to: "/contratacion-reviews", icon: "pi pi-star" },
        { label: "Registrar facturas", to: "/invoices", icon: "pi pi-user" },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />

  <header>
    <pv-toolbar class="bg-sky-blue">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer" />
        <h3 class="ml-2">ElectroLink</h3>
      </template>
      <template #center>
        <div>
          <pv-button
            v-for="item in items.slice(0, 2)"
            :key="item.label"
            as-child
            v-slot="slotProps"
          >
            <router-link :to="item.to" :class="slotProps['class']">
              {{ item.label }}
            </router-link>
          </pv-button>
        </div>
      </template>
      <template #end>
        <language-switcher />
      </template>
    </pv-toolbar>

    <!-- Sidebar Drawer -->
    <pv-drawer v-model:visible="drawer" position="left">
      <div class="p-3">
        <h4>Opciones</h4>
        <ul class="p-0 m-0 list-none">
          <li
            v-for="item in items"
            :key="item.label"
            class="mb-2"
          >
            <router-link
              :to="item.to"
              class="flex align-items-center gap-2 text-color hover:text-primary"
              @click="drawer = false"
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </pv-drawer>
  </header>

  <main>
    <div class="bg-lavander p-4 min-h-screen">
      <router-view />
    </div>
  </main>

  <footer>
    <footer-content />
  </footer>
</template>

<style scoped>
header {
  flex: 0 0 auto;
}

main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

footer {
  position: relative;
  bottom: 0;
  padding: 10px;
}

.bg-sky-blue {
  background-color: #B5D5F5;
}

.bg-lavander {
  background-color: #E5E9EE;
}
</style>

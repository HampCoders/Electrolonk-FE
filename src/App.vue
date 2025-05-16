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
        { label: "Dashboard", to: "/" },
        { label: "Home", to: "/home" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/electrical-invoices" },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="bg-sky-blue">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h3>ElectroLink</h3>
      </template>
      <template #center>
        <div>
          <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{ item.label }}</router-link>
          </pv-button>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <div class="bg-lavander">
      <router-view/>

    </div>
  </main>
  <footer>
    <footer-content/>
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
  position: absolute;
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

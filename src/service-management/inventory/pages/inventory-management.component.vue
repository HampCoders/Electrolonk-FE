<template>
  <div class="p-px-3 p-py-4">

    <div class="p-d-flex p-jc-end p-mb-3" style="padding: 25px 0 0 0">
      <button class="p-button p-button-success" @click="openCreateDialog">
        Nuevo Inventario
      </button>
    </div>

    <div class="p-grid">
      <div
          v-for="inventory in inventories"
          :key="inventory.id"
          class="p-col-12 p-md-6 p-lg-4"
      >
        <div  style="margin: 20px 0;">
          <div class="p-text-lg p-font-bold" style="color: #1a1b1f"><strong>{{ $t('inventory.serviceName') }}: </strong> {{ inventory.serviceName }}</div>
          <div class="p-text-secondary p-text-sm" style="color: #1a1b1f"><strong>ID:</strong> {{ inventory.id }}</div>

          <div class="p-mt-3">
            <div
                v-for="component in inventory.electricalComponent"
                :key="component.componentId"
                class="p-mb-2 p-p-2 bg-gray-50"
                style="padding: 0 25px;"
            >
              <div class="p-text-sm p-font-medium" style="color: #1a1b1f; padding: 10px  0"><strong>{{ $t('inventory.componentName') }}: </strong> {{ component.componentName }}</div>
              <div class="p-text-xs text-muted"><strong>{{ $t('inventory.componentModel') }}: </strong> {{ component.componentModel }}</div>
              <div class="p-text-xs text-muted"><strong>{{$t('inventory.componentManufacturer')}}: </strong> {{ component.componentManufacturer }}</div>
              <div class="p-text-xs text-muted"><strong>{{$t('inventory.componentManufacturer')}}: </strong>{{ component.installationDate }}</div>
              <div class="p-text-xs text-muted"><strong>{{$t('inventory.componentManufacturer')}}: </strong>{{ component.lastMaintenanceDate }}</div>
              <div
                  class="p-text-xs p-mt-1 p-font-bold" style="padding: 0 0 10px 0"
                  :class="{
                  'text-green-500': component.status === 'operativo',
                  'text-orange-500': component.status === 'requiere mantenimiento',
                  'text-red-500': component.status === 'inoperativo'
                }"

              >
                <strong>{{$t('inventory.status')}}</strong>: {{ component.status }}

              </div>
            </div>
          </div>

          <div class="p-d-flex p-jc-between p-mt-3" style="margin-top: 20px;">
            <button class="p-button p-button-sm p-button-info" @click="openEditDialog(inventory)" style="margin: 0 0 20px 0">Editar</button>
            <button class="p-button p-button-sm p-button-danger" @click="deleteItem(inventory)" style="margin: 0 0 0 20px">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <create-and-edit-form-component
        :visible="createAndEditDialogIsVisible"
        :entity="inventory"
        :entityName="title.singular"
        :edit="isEdit"
        :withDialog="true"
        :size="'large'"
        @cancel-action-requested="onCancelDialog"
        @save-action-requested="onSaveDialog"
    >
      <!-- Formulario principal de servicio -->
      <div class="p-grid">
        <div class="p-col-12 p-md-6">
          <div class="field">
            <label for="id">ID de Servicio</label>
            <input id="id" type="text" v-model="inventory.id" class="p-inputtext p-component" />
          </div>
        </div>
        <div class="p-col-12 p-md-6">
          <div class="field">
            <label for="serviceName"><strong>{{ $t('inventory.serviceName') }}: </strong></label>
            <input id="serviceName" type="text" v-model="inventory.serviceName" class="p-inputtext p-component" />
          </div>
        </div>
      </div>

      <!-- Sección de componentes eléctricos -->
      <div class="p-mt-4">
        <div class="p-d-flex p-jc-between p-ai-center p-mb-3" style="padding: 0 0 10px 0;">
          <h3 class="p-m-0">Componentes Eléctricos</h3>
          <button class="p-button p-button-sm p-button-success" @click="toggleComponentForm(-1)">
            Agregar Componente
          </button>
        </div>

        <!-- Formulario integrado para componentes -->
        <div v-if="showComponentForm" class="component-form " style="background-color: #19191A; margin: 10px 0 20px 20px">
          <h4 class="p-mb-2">{{ editingComponentIndex === -1 ? 'Nuevo Componente' : 'Editar Componente' }}</h4>

          <div class="p-grid">
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="componentId">ID del Componente</label>
                <input id="componentId" type="text" v-model="newComponent.componentId" class="p-inputtext p-component" readonly />
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="componentName"><strong>{{ $t('inventory.componentName') }}: </strong></label>
                <input id="componentName" type="text" v-model="newComponent.componentName" class="p-inputtext p-component" />
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="componentModel"><strong>{{ $t('inventory.componentModel') }}: </strong></label>
                <input id="componentModel" type="text" v-model="newComponent.componentModel" class="p-inputtext p-component" />
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="componentManufacturer"><strong>{{ $t('inventory.componentManufacturer') }}: </strong></label>
                <input id="componentManufacturer" type="text" v-model="newComponent.componentManufacturer" class="p-inputtext p-component" />
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="installationDate">Fecha de Instalación</label>
                <input id="installationDate" type="date" v-model="newComponent.installationDate" class="p-inputtext p-component" />
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div class="field">
                <label for="lastMaintenanceDate">Última Fecha de Mantenimiento</label>
                <input id="lastMaintenanceDate" type="date" v-model="newComponent.lastMaintenanceDate" class="p-inputtext p-component" />
              </div>
            </div>
            <div class="p-col-12">
              <div class="field">
                <label for="status"><strong>{{ $t('inventory.status') }}: </strong></label>
                <select id="status" v-model="newComponent.status" class="p-inputtext p-component" style="width: 100%">
                  <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-d-flex p-jc-end p-mt-3">
            <button class="p-button p-component p-button-secondary p-button-outlined p-mr-2" @click="hideComponentForm">
              Cancelar
            </button>
            <button class="p-button p-component p-button-success" @click="onSaveComponent">
              Guardar Componente
            </button>
          </div>
        </div>

        <!-- Tabla de componentes -->
        <div class="p-datatable p-component">
          <div class="p-datatable-wrapper">
            <table class="p-datatable-table">
              <thead class="p-datatable-thead">
              <tr>
                <th class="p-sortable-column">ID</th>
                <th class="p-sortable-column">Nombre</th>
                <th class="p-sortable-column">Modelo</th>
                <th class="p-sortable-column">Fabricante</th>
                <th class="p-sortable-column">Estado</th>
                <th style="width: 120px">Acciones</th>
              </tr>
              </thead>
              <tbody class="p-datatable-tbody">
              <tr v-for="(component, index) in inventory.electricalComponent" :key="component.componentId">
                <td>{{ component.componentId }}</td>
                <td>{{ component.componentName }}</td>
                <td>{{ component.componentModel }}</td>
                <td>{{ component.componentManufacturer }}</td>
                <td>
                    <span
                        class="p-badge"
                        :class="{
                        'p-badge-success': component.status === 'operativo',
                        'p-badge-warning': component.status === 'requiere mantenimiento',
                        'p-badge-danger': component.status === 'inoperativo'
                      }"
                    >
                      {{ component.status }}
                    </span>
                </td>
                <td>
                  <div class="p-d-flex p-jc-between">
                    <button class="p-button p-button-sm p-button-text p-button-info p-mr-1" @click="toggleComponentForm(index)">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button class="p-button p-button-sm p-button-text p-button-danger" @click="deleteComponent(index)">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!inventory.electricalComponent || inventory.electricalComponent.length === 0">
                <td colspan="6" class="p-text-center p-py-3">No hay componentes agregados</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </create-and-edit-form-component>
  </div>
</template>

<script>
import {ElectricalComponent} from "@/service-management/inventory/model/electrical-component.entity.js";
import {InventoryItem} from "@/service-management/inventory/model/inventory.entity.js";
import {InventoryService} from "@/service-management/inventory/services/inventory.service.js";
import {ElectricalComponentService} from "@/service-management/inventory/services/electrical-component.service.js";

import DataManagerComponent from "@/shared/components/data-manager.component.vue";
import CreateAndEditFormComponent from "@/shared/components/create-and-edit-form.component.vue";

export default {
  name: "inventory-management",
  components: {CreateAndEditFormComponent, DataManagerComponent},
  data() {
    return {
      title: { singular: "Inventory", plural: "Inventories" },
      inventories: [],
      inventory: new InventoryItem({
        electricalComponent: [] // Inicializar con array vacío
      }),
      selectedInventory: [],
      components: [],
      inventoryService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
      // Para componente eléctrico temporal
      newComponent: {},
      showComponentForm: false, // Controla la visibilidad del formulario integrado
      editingComponentIndex: -1, // -1 significa nuevo componente, otro valor es edición
      // Opciones para estados de componentes
      statusOptions: [
        { value: "operativo", label: "Operativo" },
        { value: "requiere mantenimiento", label: "Requiere Mantenimiento" },
        { value: "inoperativo", label: "Inoperativo" }
      ]
    };
  },
  created() {
    this.inventoryService = new InventoryService();
    this.fetchInventories();
    this.resetNewComponent();
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "success", summary: "Success", detail: message, life: 3000 });
    },

    async fetchInventories() {
      try {
        const response = await this.inventoryService.getAll();
        this.inventories = response.data;

        // Extraer todos los componentes eléctricos de todos los inventarios
        this.components = this.inventories.flatMap(inv => inv.electricalComponent);
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    },

    openCreateDialog() {
      this.inventory = new InventoryItem({
        electricalComponent: [] // Inicializar con array vacío
      });
      this.isEdit = false;
      this.createAndEditDialogIsVisible = true;
      this.hideComponentForm(); // Ocultar formulario de componentes al abrir
    },

    openEditDialog(item) {
      this.inventory = new InventoryItem({
        ...item,
        electricalComponent: [...(item.electricalComponent || [])] // Asegurar copia profunda
      });
      this.isEdit = true;
      this.createAndEditDialogIsVisible = true;
      this.hideComponentForm(); // Ocultar formulario de componentes al abrir
    },

    onCancelDialog() {
      this.hideComponentForm(); // Asegurarse de ocultar el formulario de componentes
      this.createAndEditDialogIsVisible = false;
    },

    onSaveDialog(item) {
      if (!item.electricalComponent) {
        item.electricalComponent = [];
      }

      if (this.isEdit) {
        this.inventoryService.update(item.id, item).then(() => {
          this.notifySuccessfulAction("Inventory updated");
          this.fetchInventories();
          this.createAndEditDialogIsVisible = false;
        });
      } else {
        this.inventoryService.create(item).then(() => {
          this.notifySuccessfulAction("Inventory created");
          this.fetchInventories();
          this.createAndEditDialogIsVisible = false;
        });
      }
    },

    deleteItem(item) {
      this.inventoryService.delete(item.id).then(() => {
        this.notifySuccessfulAction("Inventory deleted");
        this.fetchInventories();
      });
    },

    deleteSelectedItems() {
      const promises = this.selectedInventory.map(item =>
          this.inventoryService.delete(item.id)
      );
      Promise.all(promises).then(() => {
        this.notifySuccessfulAction("Selected inventories deleted");
        this.selectedInventory = [];
        this.fetchInventories();
      });
    },

    // Métodos para gestionar componentes eléctricos
    resetNewComponent() {
      this.newComponent = {
        componentId: "",
        componentName: "",
        componentModel: "",
        componentManufacturer: "",
        installationDate: "",
        lastMaintenanceDate: "",
        status: "operativo"
      };
    },

    toggleComponentForm(index = -1) {
      if (index === -1) {
        // Nuevo componente
        this.resetNewComponent();
        // Generar un ID único para el nuevo componente
        this.newComponent.componentId = `EC${String(Date.now()).slice(-5)}`;
      } else {
        // Editar componente existente
        this.newComponent = { ...this.inventory.electricalComponent[index] };
      }
      this.editingComponentIndex = index;
      this.showComponentForm = true;
    },

    hideComponentForm() {
      this.showComponentForm = false;
      this.resetNewComponent();
    },

    onSaveComponent() {
      if (this.editingComponentIndex === -1) {
        // Añadir nuevo componente
        if (!this.inventory.electricalComponent) {
          this.inventory.electricalComponent = [];
        }
        this.inventory.electricalComponent.push({ ...this.newComponent });
      } else {
        // Actualizar componente existente
        this.inventory.electricalComponent[this.editingComponentIndex] = { ...this.newComponent };
      }
      this.hideComponentForm();
      this.notifySuccessfulAction(this.editingComponentIndex === -1 ?
          "Componente agregado correctamente" : "Componente actualizado correctamente");
    },

    deleteComponent(index) {
      this.inventory.electricalComponent.splice(index, 1);
      this.notifySuccessfulAction("Componente eliminado correctamente");
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      } catch (e) {
        return dateStr;
      }
    }
  },
  mounted() {
    console.log("Inventories:", this.inventories);
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.border-100 {
  border: 1px solid #b5b2b1;
}
.bg-gray-50 {
  background-color: #b5b2b1;
}
.bg-blue-50 {
  background-color: #b5b2b1;
}
.text-muted {
  color: #777;
}

.text-gray-50 {
  color: #1a1b1f;
}
.p-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
}
.p-badge-success {
  background-color: #22c55e;
  color: white;
}
.p-badge-warning {
  background-color: #f59e0b;
  color: white;
}
.p-badge-danger {
  background-color: #ef4444;
  color: white;
}
.component-form {
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background-color: #1a1a1a;
}
.p-datatable {
  border: 1px solid #b5b2b1;
  border-radius: 4px;
}
.p-datatable-table {
  width: 100%;
  border-collapse: collapse;
}
.p-datatable-thead th {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #b5b2b1;
  font-weight: 600;
  background-color: #b5b2b1;
}
.p-datatable-tbody td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #b5b2b1;
}
.border-round-lg {
  border-radius: 0.5rem;
}
</style>
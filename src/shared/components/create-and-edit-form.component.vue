<script>
import { computed, reactive, ref, watch } from 'vue';
import {Dialog as PvDialog, Button as PvButton} from 'primevue'

const DEFAULT_STYLE = { width: '400px' };
const STYLE_MAP = {
  'default': { width: '400px' },
  'standard': { width: '500px' },
  'large': { width: '900px' },
  'fullscreen': { width: '90vw', height: '90vh' }
};

export default {
  name: "create-and-edit-form",
  props: {
    entity: {
      type: Object,
      default: () => ({})
    },
    withDialog:{
      type: Boolean,
      default: true  // Cambiado a true para que por defecto use el diálogo modal
    },
    visible: {
      type: Boolean,
      default: false
    },
    entityName: {
      type: String,
      default: 'Ítem'
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'standard', 'large', 'fullscreen'].includes(value)
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel-action-requested', 'save-action-requested', 'update:visible','update:entity'],
  data() {
    return {
      formData : reactive({ ...this.entity }),
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      }
    },
    // Corregido: Sacado del objeto isVisible
    showCancelButton() {
      return this.showCancel;
    },
    dialogStyle() {
      return STYLE_MAP[this.size] || DEFAULT_STYLE;
    },
    headerTitle() {
      return `${this.isEdit ? 'Editar' : 'Crear'} ${this.entityName}`;
    },

    // Computed para etiqueta del botón de guardar
    submitLabel() {
      return this.isEdit ? 'Actualizar' : 'Crear';
    }
  },
  watch: {
    entity: {
      handler(newValue) {
        Object.assign(this.formData, newValue || {});
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel-action-requested');
    },
    onSave() {
      this.$emit('update:entity', { ...this.formData });
      this.$emit('save-action-requested', this.formData);
      if (this.withDialog) {
        this.$emit('update:visible', false);
      }
    }
  }
}
</script>

<template>
  <div class="base-form">
    <template v-if="withDialog">
      <pv-dialog
          v-model:visible="isVisible"
          :modal="true"
          :style="dialogStyle"
          class="p-fluid"
          :header="headerTitle"
          :closable="true"
          :dismissableMask="true">

        <div class="form-container">
          <slot></slot>

          <slot name="nested-forms"></slot>
        </div>

        <template #footer>
          <div class="flex justify-content-end">
            <pv-button
                type="button"
                :label="submitLabel"
                class="p-button-primary"
                icon="pi pi-check"
                @click="onSave"/>
            <pv-button
                v-if="showCancelButton"
                type="button"
                label="Cancelar"
                severity="secondary"
                class="p-button-outlined ml-2"
                icon="pi pi-times"
                @click="onCancel"/>
          </div>
        </template>
      </pv-dialog>
    </template>

    <template v-else>
      <div class="form-header">
        <h2>{{ headerTitle }}</h2>
      </div>

      <slot></slot>

      <slot name="nested-forms"></slot>

      <div class="form-footer flex justify-content-end">
        <pv-button
            type="button"
            :label="submitLabel"
            class="p-button-primary"
            icon="pi pi-check"
            @click="onSave"/>
        <pv-button
            v-if="showCancelButton"
            type="button"
            label="Cancelar"
            severity="secondary"
            class="p-button-outlined ml-2"
            icon="pi pi-times"
            @click="onCancel"/>
      </div>
    </template>
  </div>
</template>

<style scoped>
.base-form {
  display: flex;
  flex-direction: column;
}

.form-container {
  padding: 1rem;
}

.form-header {
  margin-bottom: 1rem;
}

.form-footer {
  margin-top: 1.5rem;
}

/* Estilos para campos de formulario */
:deep(.field) {
  margin-bottom: 1.5rem;
}

:deep(.field label) {
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

:deep(.p-inputtext.p-invalid) {
  border-color: #f44336;
}

:deep(.validation-error) {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
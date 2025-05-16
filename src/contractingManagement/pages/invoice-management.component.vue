<script>
import { Invoice } from "../model/invoice.entity.js";
import { InvoiceService } from "../services/invoice.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import InvoiceItemCreateAndEditDialog from "../components/invoice-item.component.vue";

export default {
  name: "invoice-management",
  components: { InvoiceItemCreateAndEditDialog, DataManager },
  data() {
    return {
      title: { singular: "Invoice", plural: "Invoices" },
      invoices: [],
      invoice: new Invoice({}),
      selectedInvoices: [],
      invoiceService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    };
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.invoices.findIndex(invoice => invoice.id === id);
    },
    onNewItem() {
      this.invoice = new Invoice({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onEditItem(item) {
      this.invoice = new Invoice(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.invoice = { ...item };
      this.deleteInvoice();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedInvoices = selectedItems;
      this.deleteSelectedInvoices();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      this.submitted = true;
      if (this.invoice.meterNumber && this.invoice.totalAmount) {
        if (item.id) {
          this.updateInvoice();
        } else {
          this.createInvoice();
        }
        this.createAndEditDialogIsVisible = false;
        this.isEdit = false;
      }
    },
    createInvoice() {
      this.invoiceService.create(this.invoice).then(response => {
        let invoice = new Invoice(response.data);
        this.invoices.push(invoice);
        this.notifySuccessfulAction("Invoice Created");
      }).catch(console.error);
    },
    updateInvoice() {
      this.invoiceService.update(this.invoice.id, this.invoice).then(response => {
        let index = this.findIndexById(this.invoice.id);
        this.invoices[index] = new Invoice(response.data);
        this.notifySuccessfulAction("Invoice Updated");
      }).catch(console.error);
    },
    deleteInvoice() {
      this.invoiceService.delete(this.invoice.id).then(() => {
        let index = this.findIndexById(this.invoice.id);
        this.invoices.splice(index, 1);
        this.notifySuccessfulAction("Invoice Deleted");
      }).catch(console.error);
    },
    deleteSelectedInvoices() {
      this.selectedInvoices.forEach((invoice) => {
        this.invoiceService.delete(invoice.id).then(() => {
          this.invoices = this.invoices.filter(t => t.id !== invoice.id);
        });
      });
      this.notifySuccessfulAction("Invoices Deleted");
    }
  },
  created() {
    this.invoiceService = new InvoiceService();
    this.invoiceService.getAll().then(response => {
      this.invoices = response.data.map(invoice => new Invoice(invoice));
    }).catch(console.error);
  }
};
</script>

<template>
  <div class="w-full">
    <h2 class="invoices-title">{{ $t('invoice.title') }}</h2>

    <!-- Visualización en tarjetas -->
    <div v-for="invoice in invoices" :key="invoice.id" class="invoice-card">
      <div><strong>{{ $t('invoice.receiptNumber') }}:</strong> {{ invoice.receiptNumber }}</div>
      <div>{{ $t('invoice.meterNumber') }}: {{ invoice.meterNumber }}</div>
      <div>{{ $t('invoice.totalAmount') }}: S/ {{ invoice.totalAmount }}</div>
      <div>{{ $t('invoice.category') }} - {{ invoice.zone }}</div>
    </div>

    <!-- Tabla editable -->
    <data-manager :title="title"
                  :items="invoices"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column field="id" :header="$t('invoice.id')" style="min-width: 10rem" />
        <pv-column field="meterNumber" :header="$t('invoice.meterNumber')" />
        <pv-column field="totalAmount" :header="$t('invoice.totalAmount')" />
        <pv-column field="category" :header="$t('invoice.category')" />
        <pv-column field="receiptNumber" :header="$t('invoice.receiptNumber')" />
      </template>
    </data-manager>

    <invoice-item-create-and-edit-dialog
        :edit="isEdit"
        :item="invoice"
        :visible="createAndEditDialogIsVisible"
        @cancel-requested="onCancelRequested"
        @save-requested="onSaveRequested($event)" />
  </div>
</template>

<style scoped>
.invoice-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  background: #f9f9f9;
}
.invoices-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #003366;
}
</style>

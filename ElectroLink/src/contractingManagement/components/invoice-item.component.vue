<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "invoice-item-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: null,
    visible: false
  },
  emits: ['cancel-requested', 'save-requested'],
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
};
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entity-name="Invoice"
                   @cancel-action-requested="onCancelRequested"
                   @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">

        <div class="field mt-4">
          <pv-float-label>
            <label for="meterNumber">{{ $t('invoice.meterNumber') }}</label>
            <pv-input-text id="meterNumber" v-model="item.meterNumber" :class="{ 'p-invalid': submitted && !item.meterNumber }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="periodStart">{{ $t('invoice.periodStart') }}</label>
            <pv-input-text id="periodStart" type="date" v-model="item.periodStart" :class="{ 'p-invalid': submitted && !item.periodStart }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="periodEnd">{{ $t('invoice.periodEnd') }}</label>
            <pv-input-text id="periodEnd" type="date" v-model="item.periodEnd" :class="{ 'p-invalid': submitted && !item.periodEnd }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="consumptionKwh">{{ $t('invoice.consumptionKwh') }}</label>
            <pv-input-text id="consumptionKwh" v-model="item.consumptionKwh" :class="{ 'p-invalid': submitted && !item.consumptionKwh }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="totalAmount">{{ $t('invoice.totalAmount') }}</label>
            <pv-input-text id="totalAmount" v-model="item.totalAmount" :class="{ 'p-invalid': submitted && !item.totalAmount }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="issueDate">{{ $t('invoice.issueDate') }}</label>
            <pv-input-text id="issueDate" type="date" v-model="item.issueDate" :class="{ 'p-invalid': submitted && !item.issueDate }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="dueDate">{{ $t('invoice.dueDate') }}</label>
            <pv-input-text id="dueDate" type="date" v-model="item.dueDate" :class="{ 'p-invalid': submitted && !item.dueDate }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="rate">{{ $t('invoice.rate') }}</label>
            <pv-input-text id="rate" v-model="item.rate" :class="{ 'p-invalid': submitted && !item.rate }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="category">{{ $t('invoice.category') }}</label>
            <pv-input-text id="category" v-model="item.category" :class="{ 'p-invalid': submitted && !item.category }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="zone">{{ $t('invoice.zone') }}</label>
            <pv-input-text id="zone" v-model="item.zone" :class="{ 'p-invalid': submitted && !item.zone }"/>
          </pv-float-label>
        </div>

        <div class="field mt-4">
          <pv-float-label>
            <label for="receiptNumber">{{ $t('invoice.receiptNumber') }}</label>
            <pv-input-text id="receiptNumber" v-model="item.receiptNumber" :class="{ 'p-invalid': submitted && !item.receiptNumber }"/>
          </pv-float-label>
        </div>

        <!-- Tabla de amountDetails -->
        <div class="mt-5">
          <h4 class="text-xl mb-3">{{ $t('invoice.amountDetails') }}</h4>
          <pv-data-table :value="item.amountDetails" responsiveLayout="scroll">
            <pv-column field="concept" :header="$t('amountDetail.concept')"></pv-column>
            <pv-column field="amount" :header="$t('amountDetail.amount')"></pv-column>
          </pv-data-table>
        </div>

      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Forzar texto de los inputs a negro */
.p-inputtext {
  color: #000 !important;
}

/* También aplica a inputs dentro de float-label */
.p-float-label input {
  color: #000 !important;
}

/* Por si también necesitas ver el label en negro */
.p-float-label label {
  color: #000 !important;
}
</style>

// Invoice.js
import { AmountDetail } from '../model/amountConcept.entity.js';

export class Invoice {
    constructor({
                    id = '',
                    meterNumber = '',
                    periodStart = '',
                    periodEnd = '',
                    consumptionKwh = 0,
                    totalAmount = 0,
                    issueDate = '',
                    dueDate = '',
                    rate = '',
                    amountDetails = [],
                    category = '',
                    zone = '',
                    receiptNumber = ''
                }) {
        this.id = id;
        this.meterNumber = meterNumber;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.consumptionKwh = consumptionKwh;
        this.totalAmount = totalAmount;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.rate = rate;
        this.amountDetails = amountDetails.map(item => new AmountDetail(item)); // Transformar a objetos AmountDetail
        this.category = category;
        this.zone = zone;
        this.receiptNumber = receiptNumber;
    }
}

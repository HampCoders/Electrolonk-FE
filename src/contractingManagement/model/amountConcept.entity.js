export class AmountDetail {
    constructor({
                    concept = '',
                    amount = 0
                }) {
        this.concept = concept; // Descripción del concepto cobrado
        this.amount = amount;   // Monto correspondiente al concepto
    }
}

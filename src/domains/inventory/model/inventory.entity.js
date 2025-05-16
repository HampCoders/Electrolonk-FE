
export class InventoryItem {
    constructor({id = null, serviceName = '', electricalComponent = []} = {}) {
        this.id = new Date().getTime().toString();
        this.serviceName = serviceName;
        this.electricalComponent = electricalComponent;
    }
}

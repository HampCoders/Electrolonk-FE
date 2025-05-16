export class ElectricalComponent {
    constructor({id, name, model,manufacturer,installationDate,lastMaintenanceDate,status} = {}) {
        this.componentId = id;
        this.componentName = name;
        this.componentModel = model;
        this.componentManufacturer = manufacturer;
        this.installationDate = installationDate;
        this.lastMaintenanceDate = lastMaintenanceDate;
        this.status = status;
    }
}

export class ScheduleItem {
    constructor({
                    id = null,
                    name = '',
                    date = '',
                    time = '',
                    company = '',
                    district = '',

                    // Nuevos campos de cliente
                    clientFirstName = '',
                    clientLastName = '',
                    clientEmail = '',

                    // Nuevos campos de servicio
                    serviceName = '',
                    serviceDescription = '',

                    // Componente extra (solo uno por ahora para simplificar)
                    componentName = '',
                    componentModel = '',

                } = {}) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;

        this.clientFirstName = clientFirstName;
        this.clientLastName = clientLastName;
        this.clientEmail = clientEmail;

        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;

        this.componentName = componentName;
        this.componentModel = componentModel;
    }
}

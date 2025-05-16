import httpInstance from '@/shared/services/http.instance.js';

export class InvoiceService {
    resourceEndpoint = import.meta.env.VITE_INVOICES_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    // Si deseas buscar por número de medidor, por ejemplo
    getByMeterNumber(meterNumber) {
        return httpInstance.get(`${this.resourceEndpoint}?meterNumber=${meterNumber}`);
    }
}

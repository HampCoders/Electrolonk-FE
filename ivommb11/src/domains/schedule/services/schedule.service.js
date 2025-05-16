import httpInstance from "@/shared/services/http.instance.js";

export class ScheduleService {
    ENDPOINT_PATH = import.meta.env.VITE_SCHEDULE_ENDPOINT;
    getAll() {

        return httpInstance.get(this.ENDPOINT_PATH);
    }

    getById(id) {

        return httpInstance.get(`${this.ENDPOINT_PATH}/${id}`);

    }


    create(resource) {
        return httpInstance.post(this.ENDPOINT_PATH, resource);
    }

    update(id, resource) {
        return httpInstance.put(`${this.ENDPOINT_PATH}/${id}`, resource);
    }


    delete(id) {
        return httpInstance.delete(`${this.ENDPOINT_PATH}/${id}`);
    }


    getByName(name) {
        return httpInstance.get(`${this.ENDPOINT_PATH}?name=${name}`);
    }
}


import httpInstance from "../../shared/services/http.instance.js";

export class ReviewService {
    resourceEndpoint = import.meta.env.VITE_REVIEWS_ENDPOINT_PATH;

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

// Si necesitas buscar por comentario:
    getByComment(comment) {
        return httpInstance.get(`${this.resourceEndpoint}?comment=${comment}`);
    }
}
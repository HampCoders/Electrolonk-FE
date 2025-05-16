export class Review {
    constructor({
                    id = '',
                    userId = '',
                    rating = 0,
                    comment = '',
                }) {
        this.id = id; // Identificador único de la reseña
        this.userId = userId; // Referencia al usuario que hizo la reseña
        this.rating = rating; // Calificación numérica (por ejemplo, 1-5)
        this.comment = comment; // Comentario del usuario
    }
}
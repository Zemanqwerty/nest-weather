export class PayloadDto {
    user_id: number;

    constructor(model: { id: number }) {
        this.user_id = model.id;
    }
}
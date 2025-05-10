import {Pool, RowDataPacket} from "mysql2/promise";
import {Database} from "./database";
import {CreateCar} from "../common/interfaces";

export class CarModel {
    db: Pool;

    constructor() {
        this.db = new Database().conn;
    }
    async getAll() {
        const [rows] = await this.db.query("SELECT * FROM cars");
        return rows;
    }
    async getById(id: string) {
        const [rows] = await this.db.execute(`SELECT * FROM cars WHERE id = ?`, [id]);
        return rows;
    }
    async create(car: CreateCar) {
        const [rows] = await this.db.execute(`INSERT INTO cars (manufacturer, model, price_per_day, rating, is_rented, is_active, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            car.manufacturer, car.model, car.price_per_day, car.rating, car.is_rented, car.is_active, car.image_url ]);
        return `Car is created successfully.`;
    }
    async update(id: string, car: any) {
        const fields = Object.keys(car).map(key => `${key} = ?`).join(',');
        const values = Object.values(car);
        values.push(id);
        const rows = await this.db.execute(`UPDATE cars SET ${fields} WHERE id = ?`, values);
        return `Car with id=${id} is updated successfully.`;
    }
    async delete(id: string) {
        const [rows] = await this.db.execute(`UPDATE cars SET is_active = 0 WHERE id = ?`, [id]);
        return `Car is deleted successfully.`;
    }
}
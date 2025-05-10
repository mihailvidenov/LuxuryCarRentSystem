import {CarModel} from "../models";
import {CreateCar} from "../common/interfaces";

const carModel = new CarModel();
export class CarController {

    async getAllCars() {
        return await carModel.getAll();
    }
    async getCarById(id: string) {
        return await carModel.getById(id);
    }
    async createCar(car: CreateCar) {
        return await carModel.create(car);
    }
    updateCar(id: string, user: any) {
        return carModel.update(id, user);
    }
    async deleteCar(id: string) {
        return await carModel.delete(id);
    }
}
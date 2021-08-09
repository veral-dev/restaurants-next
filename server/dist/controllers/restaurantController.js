"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.getOneRestaurant = exports.getRestaurants = exports.restaurantCreate = void 0;
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const express_validator_1 = require("express-validator");
function restaurantCreate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //Crear un nuevo restaurante
            const restaurant = new Restaurant_model_1.default(req.body);
            //Guardar el restaurante
            const resp = yield restaurant.save();
            res.json({ id: resp._id });
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.restaurantCreate = restaurantCreate;
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield Restaurant_model_1.default.find({}, { name: 1, image: 1 }).sort({
                createdAt: -1,
            });
            res.json(restaurants);
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.getRestaurants = getRestaurants;
function getOneRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rest = yield Restaurant_model_1.default.findOne({ _id: req.params.id });
            res.status(200).json(rest);
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.getOneRestaurant = getOneRestaurant;
function updateRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Revisar si hay errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Extraer la información del restaurante
        const { name } = req.body;
        const newRestaurant = {};
        if (name) {
            newRestaurant.name = name;
        }
        try {
            //Revisar el ID
            let restaurant = yield Restaurant_model_1.default.findById(req.params.id);
            //Existe el restaurante o no
            if (!restaurant) {
                return res.status(404).json({ msg: 'Restaurante no encontrado' });
            }
            //Actualizar restaurante
            restaurant = yield Restaurant_model_1.default.findByIdAndUpdate({ _id: req.params.id }, { $set: newRestaurant }, { new: true });
            res.json({ restaurant });
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.updateRestaurant = updateRestaurant;
//Eliminar restaurante por ID
function deleteRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // revisar el ID
            let restaurant = yield Restaurant_model_1.default.findById(req.params.id);
            // si el restaurante existe o no
            if (!restaurant) {
                return res.status(404).json({ msg: 'Restaurante no encontrado' });
            }
            // Eliminar el restaurante
            yield Restaurant_model_1.default.findOneAndRemove({ _id: req.params.id });
            // Eliminar favorito de los usuarios si existen
            const users = yield User_model_1.default.find({ favourites: { $in: [req.params.id] } });
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const favourites = user.favourites.filter((elm) => elm !== req.params.id);
                yield user.updateOne({ favourites: favourites });
            }
            res.json({ msg: 'Restaurante eliminado ' });
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.deleteRestaurant = deleteRestaurant;
exports.default = {
    restaurantCreate,
    getOneRestaurant,
    getRestaurants,
    updateRestaurant,
    deleteRestaurant,
};
//# sourceMappingURL=restaurantController.js.map
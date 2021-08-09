"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const restaurantController_1 = __importDefault(require("../controllers/restaurantController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
// Crear restaurante
router.post('/', auth_1.default, [
    express_validator_1.check('name', ' El nombre del restaurante es obligatorio')
        .not()
        .isEmpty(),
], restaurantController_1.default.restaurantCreate);
//Obtener restaurantes
router.get('/', restaurantController_1.default.getRestaurants);
router.get('/:id', restaurantController_1.default.getOneRestaurant);
//Actualizar restaurante por ID
router.put('/:id', auth_1.default, [
    express_validator_1.check('name', ' El nombre del restaurante es obligatorio')
        .not()
        .isEmpty(),
], restaurantController_1.default.updateRestaurant);
//Eliminar restaurante
router.delete('/:id', auth_1.default, restaurantController_1.default.deleteRestaurant);
module.exports = router;
//# sourceMappingURL=restaurant.js.map
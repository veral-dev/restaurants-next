"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Rutas para crear usuarios
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
const userController_1 = __importDefault(require("../controllers/userController"));
const { check } = require('express-validator');
//Crear un usuario
//Api/usuarios
router.post('/', [
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
], userController_1.default.createUser);
router.put('/add-favorite', auth_1.default, userController_1.default.addFavorite);
module.exports = router;
//# sourceMappingURL=user.js.map
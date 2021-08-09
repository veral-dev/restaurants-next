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
exports.authUser = exports.userAuth = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Revisar si hay errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Extraer el username y el password
        const { username, password } = req.body;
        try {
            //Revisar que sea un usuario registrado
            let user = yield User_model_1.default.findOne({ username });
            if (!user) {
                return res.status(400).json({ msg: 'El usuario no existe' });
            }
            //Revisar el password
            const correctPass = yield bcryptjs_1.default.compare(password, user.password);
            if (!correctPass) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }
            //Si todo es correcto & Crear y firmar el JWT
            const payload = {
                user: {
                    id: user.id,
                },
            };
            //Firmar el token
            jsonwebtoken_1.default.sign(payload, process.env.SECRET, {
                expiresIn: 3600, //1hora
            }, (error, token) => {
                if (error)
                    throw error;
                //Mensaje de confirmación
                res.json({ token });
            });
        }
        catch (error) {
            res.status(400).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.userAuth = userAuth;
function authUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_model_1.default.findById(req.user.id).select('-password');
            res.json({ user });
        }
        catch (error) {
            res.status(400).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.authUser = authUser;
exports.default = { userAuth, authUser };
//# sourceMappingURL=authController.js.map
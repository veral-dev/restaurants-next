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
exports.addFavorite = exports.createUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Revisar si hay errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Extraer username y password
        const { username, password } = req.body;
        try {
            //Revisar que el usuario registrado sea unico
            let user = yield User_model_1.default.findOne({ username });
            if (user) {
                return res.status(400).json({ msg: 'El usuario ya existe' });
            }
            //Crea un nuevo usuario
            user = new User_model_1.default(req.body);
            //Hashear el password
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(password, salt);
            //guardar el nuevo usuario
            yield user.save();
            //Crear y firmar el JWT
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
                msg: `Hubo un error al crear el usuario. ${error}`,
            });
        }
    });
}
exports.createUser = createUser;
// Añadir restaurante favorito
function addFavorite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_model_1.default.findById(req.user.id);
        try {
            if (user.favourites && user.favourites.includes(req.body.id)) {
                const favourites = user.favourites.filter((elm) => elm !== req.body.id);
                yield user.updateOne({ favourites: favourites });
            }
            else {
                const favourites = user.favourites;
                favourites.push(req.body.id);
                yield user.updateOne({ favourites });
            }
            res.json({ ok: 1 });
        }
        catch (error) {
            res.status(500).json({
                msg: `Hubo un error ${error}`,
            });
        }
    });
}
exports.addFavorite = addFavorite;
exports.default = { createUser, addFavorite };
//# sourceMappingURL=userController.js.map
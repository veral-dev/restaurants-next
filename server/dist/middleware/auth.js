"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');
    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }
    //Validar el token
    try {
        const cifrate = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = cifrate.user;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map
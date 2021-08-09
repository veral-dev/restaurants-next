"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
//Crear el servidor
const app = express_1.default();
// Conectar a la BBDD
db_1.default();
//Habilitar cors
app.use(cors_1.default());
//Habilitar express.json
// app.use(express.json({ extends: true } as any));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Puerto de la app
const port = 5000;
app.get('/', (_, res) => {
    res.status(200).send();
});
// //Importar rutas
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurant'));
//Arrancar la app
app.listen(port, () => console.log(`El servidor esta funcionando en el puerto ${port}`));
//# sourceMappingURL=index.js.map
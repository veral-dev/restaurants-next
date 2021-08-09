import User from '../models/User.model';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response): Promise<any> {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Extraer username y password
    const { username, password } = req.body;

    try {
        //Revisar que el usuario registrado sea unico
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //Crea un nuevo usuario
        user = new User(req.body);

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //guardar el nuevo usuario
        await user.save();

        //Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        //Firmar el token
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600, //1hora
            },
            (error, token) => {
                if (error) throw error;

                //Mensaje de confirmación
                res.json({ token });
            }
        );
    } catch (error) {
        res.status(400).json({
            msg: `Hubo un error al crear el usuario. ${error}`,
        });
    }
}

// Añadir restaurante favorito
export async function addFavorite(req: Request, res: Response): Promise<any> {
    const user = await User.findById(req.user.id);
    try {
        if (user.favourites && user.favourites.includes(req.body.id)) {
            const favourites = user.favourites.filter(
                (elm) => elm !== req.body.id
            );
            await user.updateOne({ favourites: favourites });
        } else {
            const favourites = user.favourites;
            favourites.push(req.body.id);
            await user.updateOne({ favourites });
        }
        res.json({ ok: 1 });
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export default { createUser, addFavorite };

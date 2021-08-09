import User from '../models/User.model';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export async function userAuth(req: Request, res: Response): Promise<any> {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Extraer el username y el password
    const { username, password } = req.body;

    try {
        //Revisar que sea un usuario registrado
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //Revisar el password
        const correctPass = await bcryptjs.compare(password, user.password);
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
            msg: `Hubo un error ${error}`,
        });
    }
}

export async function authUser(req: Request, res: Response): Promise<void> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(400).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export default { userAuth, authUser };

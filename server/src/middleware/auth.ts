import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
    //Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    //Validar el token

    try {
        const cifrate: any = jwt.verify(token, process.env.SECRET);
        req.user = cifrate.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}

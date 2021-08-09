import Restaurant from '../models/Restaurant.model';
import User from '../models/User.model';

import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

export async function restaurantCreate(
    req: Request,
    res: Response
): Promise<any> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //Crear un nuevo restaurante
        const restaurant = new Restaurant(req.body);

        //Guardar el restaurante
        const resp = await restaurant.save();
        res.json({ id: resp._id });
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export async function getRestaurants(
    req: Request,
    res: Response
): Promise<any> {
    try {
        const restaurants = await Restaurant.find(
            {},
            { name: 1, image: 1 }
        ).sort({
            createdAt: -1,
        });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export async function getOneRestaurant(
    req: Request,
    res: Response
): Promise<any> {
    try {
        const rest = await Restaurant.findOne({ _id: req.params.id });
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export async function updateRestaurant(
    req: Request,
    res: Response
): Promise<any> {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Extraer la información del restaurante
    const { name } = req.body;
    const newRestaurant: any = {};

    if (name) {
        newRestaurant.name = name;
    }

    try {
        //Revisar el ID
        let restaurant = await Restaurant.findById(req.params.id);

        //Existe el restaurante o no
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurante no encontrado' });
        }

        //Actualizar restaurante
        restaurant = await Restaurant.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: newRestaurant },
            { new: true }
        );
        res.json({ restaurant });
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

//Eliminar restaurante por ID
export async function deleteRestaurant(
    req: Request,
    res: Response
): Promise<any> {
    try {
        // revisar el ID
        let restaurant = await Restaurant.findById(req.params.id);

        // si el restaurante existe o no
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurante no encontrado' });
        }

        // Eliminar el restaurante
        await Restaurant.findOneAndRemove({ _id: req.params.id });

        // Eliminar favorito de los usuarios si existen
        const users = await User.find({ favourites: { $in: [req.params.id] } });
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const favourites = user.favourites.filter(
                (elm) => elm !== req.params.id
            );
            await user.updateOne({ favourites: favourites });
        }
        res.json({ msg: 'Restaurante eliminado ' });
    } catch (error) {
        res.status(500).json({
            msg: `Hubo un error ${error}`,
        });
    }
}

export default {
    restaurantCreate,
    getOneRestaurant,
    getRestaurants,
    updateRestaurant,
    deleteRestaurant,
};

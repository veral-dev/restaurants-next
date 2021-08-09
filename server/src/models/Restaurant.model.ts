import mongoose from 'mongoose';

export type RestaurantType = {
    name: string;
    neighborhood: string;
    photograph: string;
    address: string;
    latlng: Map<string, number>;
    image: string;
    cuisine_type: string;
    operating_hours: Map<string, string>;
    reviews: Array<{
        name: string;
        date: string;
        rating: number;
        comments: string;
    }>;
};

export const RestaurantSchema = new mongoose.Schema<RestaurantType>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        neighborhood: {
            type: String,
        },
        photograph: {
            type: String,
        },
        address: {
            type: String,
        },
        latlng: {
            type: Map,
        },
        image: {
            type: String,
        },
        cuisine_type: {
            type: String,
        },
        operating_hours: {
            type: Map,
        },
        reviews: [{ type: Map }],
    },
    {
        timestamps: true,
    }
);

export type DBRestaurantType = mongoose.Document & RestaurantType;

export default mongoose.model<DBRestaurantType>('Restaurant', RestaurantSchema);

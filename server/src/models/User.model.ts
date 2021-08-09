import mongoose from 'mongoose';

export type UserType = {
    username: string;
    password: string;
    favourites: string[];
};

export const UserSchema = new mongoose.Schema<UserType>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        favourites: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export type DBUserType = mongoose.Document & UserType;

export default mongoose.model<DBUserType>('User', UserSchema);

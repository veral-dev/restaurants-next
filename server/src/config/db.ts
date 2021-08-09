import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_REMOTE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('BBDD Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la app
    }
};

export default connectDB;

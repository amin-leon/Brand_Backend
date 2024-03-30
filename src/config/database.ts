import mongoose from 'mongoose';

const connectDB = (dbConnectionString?: string) => {
    const connectionString = dbConnectionString || process.env.MONGODB_URI;

    if (!connectionString) {
        console.error('MongoDB connection string is not provided.');
        process.exit(1);
    }

    mongoose.connect(connectionString);

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    db.once('open', () => {
        console.log('MongoDB connected successfully .......');
    });
};

export default connectDB;

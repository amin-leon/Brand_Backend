"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (dbConnectionString) => {
    const connectionString = dbConnectionString || process.env.MONGODB_URI;
    if (!connectionString) {
        console.error('MongoDB connection string is not provided.');
        process.exit(1);
    }
    mongoose_1.default.connect(connectionString);
    const db = mongoose_1.default.connection;
    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
    db.once('open', () => {
        console.log('MongoDB connected.......');
    });
};
exports.default = connectDB;

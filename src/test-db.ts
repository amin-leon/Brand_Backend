// src/test-db.ts
import mongoose from 'mongoose';

export async function connectTestDB(): Promise<void> {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb_test';
  await mongoose.connect(MONGODB_URI);
}

export async function closeTestDB(): Promise<void> {
  await mongoose.connection.close();
}

import mongoose from 'mongoose';

export async function connectToDatabase(url: string): Promise<void> {
  try {
    await mongoose.connect(url);
    console.log('Connected to db');
  } catch (error) {
    console.error('Error connecting to db', error);
    process.exit(1);
  }
}

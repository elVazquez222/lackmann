import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './mongooseConnect';

const app = express();
dotenv.config();
app.use(cors());

connectToDatabase(process.env.MONGODB_URL as string);

import Test from './testModel';

app.post('/test', async (req, res) => {
  try {
    const test = new Test({
      message: req.body.message,
    });

    await test.save();
    res.status(201).json({ message: 'Test created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test' });
  }
});


app.listen(process.env.PORT || 50000, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
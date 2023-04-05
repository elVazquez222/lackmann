import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './mongooseConnect';

import entityRoutes from './routes/entityRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/entities', entityRoutes);
app.use('/orders', orderRoutes);

connectToDatabase(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(process.env.PORT || 50000, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  })
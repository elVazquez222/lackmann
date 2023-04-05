import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './mongooseConnect';

import Entity from './models/Entity';
import entityRoutes from './routes/entityRoutes';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/entities', entityRoutes);

// app.get('/entities'), (req, res) =>  {

// }

app.post('/entities', async(req, res) => {
  const newEntity = new Entity(
    {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      properties: req.body.properties,
      tenantId: req.body.tenantId
    }
  );
  const createdEntity = await newEntity.save();
  res.json(createdEntity.name)
})

connectToDatabase(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(process.env.PORT || 50000, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  })
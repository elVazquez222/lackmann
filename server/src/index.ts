import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.get("/")

app.listen(5000, () => console.log('listening'))
import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();
import authRoutes from './routes/authRoutes.js';

const PORT = 8000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
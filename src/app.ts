import express from 'express';
import dotenv from 'dotenv';
import dealRoutes from './routes/dealRoutes';
import logger from './middlewares/logger';
import { requestMetrics } from './utils/metrics';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // run app on port from env or 3000 by default

app.use(express.json());
app.use(logger);

app.use('/deals', dealRoutes);

app.get('/metrics', (req, res) => {
  res.json(requestMetrics.getMetrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

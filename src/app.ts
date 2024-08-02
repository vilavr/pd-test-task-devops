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
app.use(requestMetrics.startTimer); 

app.use('/deals', dealRoutes);

app.get('/metrics', (req, res) => {
  try {
    res.json(requestMetrics.getMetrics());
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

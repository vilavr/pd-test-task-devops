import express from 'express';
import dealRoutes from './routes/dealRoutes';
import logger from './middlewares/logger';
import { requestMetrics } from './utils/metrics';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/deals', dealRoutes);

app.get('/metrics', (req, res) => {
  res.json(requestMetrics.getMetrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

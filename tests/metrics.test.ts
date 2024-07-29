import request from 'supertest';
import express from 'express';
import { requestMetrics } from '../src/utils/metrics'; 
import dealRoutes from '../src/routes/dealRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(requestMetrics.startTimer);
app.use('/deals', dealRoutes);
app.get('/metrics', (req, res) => {
  res.json(requestMetrics.getMetrics());
});

jest.setTimeout(30000); 

describe('Request Metrics Middleware', () => {
  beforeEach(() => {
    // Reset the metrics before each test
    requestMetrics.resetMetrics();
  });

  it('should record request durations and count', async () => {
    for (let i = 0; i < 20; i++) {
      await request(app).get('/deals');
    }
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    const metrics = response.body;
    expect(metrics.totalRequests).toBe(20);
    expect(metrics.meanRequestDuration).toBeGreaterThan(0);
  }, 10000);

  it('should handle varying request durations', async () => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 20; i++) {
      await request(app).get('/deals');
      await sleep(Math.random() * 100); // Introduce random delays
    }
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    const metrics = response.body;
    expect(metrics.totalRequests).toBe(20); // Ensure only the new requests are counted
    expect(metrics.meanRequestDuration).toBeGreaterThan(0);
    expect(metrics.meanRequestDuration).toBeLessThan(300);
  }, 20000); 
});

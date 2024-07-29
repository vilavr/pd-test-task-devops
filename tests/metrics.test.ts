import request from 'supertest';
import express from 'express';
import { requestMetrics } from '../src/utils/metrics'; // Adjust the path as needed
import dealRoutes from '../src/routes/dealRoutes'; // Adjust the path as needed

const app = express();
app.use(requestMetrics.startTimer);
app.use(express.json());
app.use('/deals', dealRoutes);
app.get('/metrics', (req, res) => {
  res.json(requestMetrics.getMetrics());
});

describe('Request Metrics Middleware', () => {
  beforeEach(() => {
    requestMetrics.resetMetrics();
  });

  it('should record request durations and count', async () => {
    // Make a couple of requests to the /deals endpoint
    for (let i = 0; i < 20; i++) {
      await request(app).get('/deals');
    }

    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    const metrics = response.body;
    expect(metrics.totalRequests).toBe(20);
    expect(metrics.meanRequestDuration).toBeGreaterThan(0);
  });

  it('should handle varying request durations', async () => {
    // Simulate requests with varying durations
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 20; i++) {
      await request(app).get('/deals');
      await sleep(5 * i); 
    }

    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    const metrics = response.body;
    expect(metrics.totalRequests).toBe(20);
    expect(metrics.meanRequestDuration).toBeGreaterThan(0);
    expect(metrics.meanRequestDuration).toBeLessThan(250); 
  }, 10000); // Increase the test timeout to 10 seconds
});

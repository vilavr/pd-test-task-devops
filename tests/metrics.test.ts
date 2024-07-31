import request from 'supertest';
import express from 'express';
import { requestMetrics } from '../src/utils/metrics';
import dealRoutes from '../src/routes/dealRoutes';
import dotenv from 'dotenv';
import { createRequest, createResponse } from 'node-mocks-http';

dotenv.config();

const app = express();
app.use(express.json());
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
    expect(metrics.meanRequestDuration).toBeLessThan(500);
  }, 20000);

  it('should handle Error instance in metrics', async () => {
    jest.spyOn(requestMetrics, 'getMetrics').mockImplementationOnce(() => {
      throw new Error('Metrics error');
    });

    const response = await request(app).get('/metrics');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Metrics error');
  });

  it('should handle unknown error in metrics', async () => {
    jest.spyOn(requestMetrics, 'getMetrics').mockImplementationOnce(() => {
      throw 'Unknown error';
    });

    const response = await request(app).get('/metrics');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'An unknown error occurred');
  });

  it('should reset metrics', () => {
    const req = createRequest();
    const res = createResponse();

    requestMetrics.startTimer(req, res, () => {});
    requestMetrics.startTimer(req, res, () => {});

    requestMetrics.resetMetrics();

    const metrics = requestMetrics.getMetrics();
    expect(metrics.totalRequests).toBe(0);
    expect(metrics.meanRequestDuration).toBe(0);
  });
});

import request from 'supertest';
import express from 'express';
import dealRoutes from '../src/routes/dealRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/deals', dealRoutes);

describe('Deal Controller', () => {
  it('should fetch all deals', async () => {
    const response = await request(app).get('/deals');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should create a new deal', async () => {
    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('title', 'Test Deal');
  });

  it('should update an existing deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/1').send(updatedDeal); // use a valid deal id for your test
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('title', 'Updated Test Deal');
  });
});

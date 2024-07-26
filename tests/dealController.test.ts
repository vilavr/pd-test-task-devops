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
    if (response.status !== 200) {
      console.error('Error fetching deals:', response.body);
    }
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new deal', async () => {
    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    if (response.status !== 201) {
      console.error('Error creating deal:', response.body);
    }
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Deal');
  });

  it('should update an existing deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/1').send(updatedDeal); // use a valid deal id for your test
    if (response.status !== 200) {
      console.error('Error updating deal:', response.body);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Test Deal');
  });
});

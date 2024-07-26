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
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new deal', async () => {
    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Deal');
  });

  it('should handle creating a deal with invalid data', async () => {
    const invalidDeal = { invalidField: 'Invalid Data' };
    const response = await request(app).post('/deals').send(invalidDeal);
    expect(response.status).toBe(500);
  });

  it('should update an existing deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/1').send(updatedDeal); // use a valid deal id for your test
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Test Deal');
  });

  it('should handle updating a non-existent deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/9999').send(updatedDeal); // use an invalid deal id for your test
    expect(response.status).toBe(500);
  });

  it('should handle updating a deal with invalid data', async () => {
    const invalidDeal = { invalidField: 'Invalid Data' };
    const response = await request(app).put('/deals/1').send(invalidDeal); // use a valid deal id for your test
    expect(response.status).toBe(500);
  });
});

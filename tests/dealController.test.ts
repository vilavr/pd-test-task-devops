import request from 'supertest';
import express from 'express';
import dealRoutes from '../src/routes/dealRoutes';
import dotenv from 'dotenv';
import * as dealService from '../src/services/dealService';

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

  it('should handle error when fetching deals', async () => {
    jest.spyOn(dealService, 'fetchDeals').mockImplementationOnce(() => {
      throw new Error('Fetch deals failed');
    });

    const response = await request(app).get('/deals');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Fetch deals failed');
  });

  it('should create a new deal', async () => {
    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Deal');
  });

  it('should handle error when creating a new deal', async () => {
    jest.spyOn(dealService, 'createDeal').mockImplementationOnce(() => {
      throw new Error('Create deal failed');
    });

    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Create deal failed');
  });

  it('should handle creating a deal with invalid data', async () => {
    const invalidDeal = { invalidField: 'Invalid Data' };
    const response = await request(app).post('/deals').send(invalidDeal);
    expect(response.status).toBe(500);
  });

  it('should update an existing deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/431').send(updatedDeal);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Test Deal');
  });

  it('should handle error when updating a deal', async () => {
    jest.spyOn(dealService, 'modifyDeal').mockImplementationOnce(() => {
      throw new Error('Update deal failed');
    });

    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/1').send(updatedDeal);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Update deal failed');
  });

  it('should handle updating a non-existent deal', async () => {
    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/9999').send(updatedDeal);
    expect(response.status).toBe(500);
  });

  it('should handle updating a deal with invalid data', async () => {
    const invalidDeal = { invalidField: 'Invalid Data' };
    const response = await request(app).put('/deals/1').send(invalidDeal);
    expect(response.status).toBe(500);
  });

  it('should handle unknown error in fetchDeals', async () => {
    jest.spyOn(dealService, 'fetchDeals').mockImplementationOnce(() => {
      throw 'Unknown error';
    });

    const response = await request(app).get('/deals');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'An unknown error occurred');
  });

  it('should handle unknown error in createDeal', async () => {
    jest.spyOn(dealService, 'createDeal').mockImplementationOnce(() => {
      throw 'Unknown error';
    });

    const newDeal = { title: 'Test Deal' };
    const response = await request(app).post('/deals').send(newDeal);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'An unknown error occurred');
  });

  it('should handle unknown error in modifyDeal', async () => {
    jest.spyOn(dealService, 'modifyDeal').mockImplementationOnce(() => {
      throw 'Unknown error';
    });

    const updatedDeal = { title: 'Updated Test Deal' };
    const response = await request(app).put('/deals/1').send(updatedDeal);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'An unknown error occurred');
  });
});

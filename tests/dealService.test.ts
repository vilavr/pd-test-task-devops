import axios from 'axios';
import { fetchDeals, createDeal, modifyDeal } from '../src/services/dealService';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Deal Service', () => {
  it('should fetch deals', async () => {
    const deals = { data: [{ id: 1, title: 'Test Deal' }] };
    mockedAxios.get.mockResolvedValue({ data: deals });

    const result = await fetchDeals();
    expect(result).toEqual(deals.data);
  });

  it('should create a new deal', async () => {
    const newDeal = { id: 1, title: 'Test Deal' };
    mockedAxios.post.mockResolvedValue({ data: { data: newDeal } });

    const result = await createDeal(newDeal);
    expect(result).toEqual(newDeal);
  });

  it('should handle error when creating a new deal', async () => {
    mockedAxios.post.mockRejectedValue(new Error('API Error'));

    await expect(createDeal({ title: 'Test Deal' })).rejects.toThrow('API Error');
  });

  it('should modify a deal', async () => {
    const updatedDeal = { id: 1, title: 'Updated Test Deal' };
    mockedAxios.put.mockResolvedValue({ data: { data: updatedDeal } });

    const result = await modifyDeal('1', updatedDeal);
    expect(result).toEqual(updatedDeal);
  });

  it('should handle error when modifying a deal', async () => {
    mockedAxios.put.mockRejectedValue(new Error('API Error'));

    await expect(modifyDeal('1', { title: 'Updated Test Deal' })).rejects.toThrow('API Error');
  });
});

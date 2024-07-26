import axios from 'axios';
import dotenv from 'dotenv';
import { Deal } from '../types/deal';

dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.pipedrive.com/v1/deals';

axios.defaults.params = {
  api_token: API_TOKEN,
};

export const fetchDeals = async (): Promise<Deal[]> => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};

export const createDeal = async (dealData: Deal): Promise<Deal> => {
  const response = await axios.post(BASE_URL, dealData);
  return response.data.data;
};

export const modifyDeal = async (id: string, dealData: Deal): Promise<Deal> => {
  const response = await axios.put(`${BASE_URL}/${id}`, dealData);
  return response.data.data;
};

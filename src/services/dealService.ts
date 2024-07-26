import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.pipedrive.com/v1/deals';

// Set the default parameters for axios
axios.defaults.params = {
  api_token: API_TOKEN,
};

// Function to fetch all deals
export const fetchDeals = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Function to create a new deal
export const createDeal = async (dealData: any) => {
  const response = await axios.post(BASE_URL, dealData);
  return response.data;
};

// Function to modify an existing deal
export const modifyDeal = async (id: string, dealData: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, dealData);
  return response.data;
};

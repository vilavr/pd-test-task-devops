import axios from 'axios';

const API_TOKEN = 'your-pipedrive-api-token';
const BASE_URL = 'https://api.pipedrive.com/v1/deals';

axios.defaults.params = {
  api_token: API_TOKEN,
};

export const fetchDeals = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createDeal = async (dealData: any) => {
  const response = await axios.post(BASE_URL, dealData);
  return response.data;
};

export const modifyDeal = async (id: string, dealData: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, dealData);
  return response.data;
};

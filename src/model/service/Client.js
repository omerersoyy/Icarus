import ApiConfig from '../../config/ApiConfig';
import {create} from 'apisauce';

export const createClient = () => {
  const client = create({
    baseURL: ApiConfig.baseURL,
    timeout: 10000,
    headers: ApiConfig.headers,
  });

  const getAllCards = () => client.get('/cards');

  return {
    client,
    getAllCards,
  };
};

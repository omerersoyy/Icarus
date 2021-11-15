import {baseURL, headers} from '../../config/ApiConfig';
import {create} from 'apisauce';

export const createClient = () => {
  const client = create({
    baseURL,
    timeout: 10000,
    headers,
  });

  const getAllCards = () => client.get('/cards');

  return {
    client,
    getAllCards,
  };
};

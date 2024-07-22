import axios from './Interceptors';
import { API_ENDPOINT } from '../Config';
import { IProduct } from '../interfaces/IProduct';

export const getAll = async (): Promise<IProduct[]> => {
  const uri = `${API_ENDPOINT}/products`;
  return await axios.get(`${API_ENDPOINT}/products`).then((res) => {
    return res.data.data;
  });
};

export const getById = async (id: string): Promise<IProduct| undefined> => {
  const product = await axios.get(`${API_ENDPOINT}/products/${id}`).then((res) => {
    return res.data.data;
  });
  return product;
};

export const create = async (product: IProduct) => {
  const data = await axios.post(`${API_ENDPOINT}/products`, product).then((res) => {
    return res.data;
  });
  return data;
};


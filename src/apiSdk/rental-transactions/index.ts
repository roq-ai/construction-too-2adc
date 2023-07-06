import axios from 'axios';
import queryString from 'query-string';
import { RentalTransactionInterface, RentalTransactionGetQueryInterface } from 'interfaces/rental-transaction';
import { GetQueryInterface } from '../../interfaces';

export const getRentalTransactions = async (query?: RentalTransactionGetQueryInterface) => {
  const response = await axios.get(`/api/rental-transactions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRentalTransaction = async (rentalTransaction: RentalTransactionInterface) => {
  const response = await axios.post('/api/rental-transactions', rentalTransaction);
  return response.data;
};

export const updateRentalTransactionById = async (id: string, rentalTransaction: RentalTransactionInterface) => {
  const response = await axios.put(`/api/rental-transactions/${id}`, rentalTransaction);
  return response.data;
};

export const getRentalTransactionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rental-transactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRentalTransactionById = async (id: string) => {
  const response = await axios.delete(`/api/rental-transactions/${id}`);
  return response.data;
};

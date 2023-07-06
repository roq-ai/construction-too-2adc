import { RentalTransactionInterface } from 'interfaces/rental-transaction';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  rental_transaction?: RentalTransactionInterface[];
  user?: UserInterface;
  _count?: {
    rental_transaction?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}

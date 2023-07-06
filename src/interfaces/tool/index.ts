import { RentalTransactionInterface } from 'interfaces/rental-transaction';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ToolInterface {
  id?: string;
  name: string;
  availability_status: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  rental_transaction?: RentalTransactionInterface[];
  company?: CompanyInterface;
  _count?: {
    rental_transaction?: number;
  };
}

export interface ToolGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  availability_status?: string;
  company_id?: string;
}

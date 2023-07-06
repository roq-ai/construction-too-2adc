import { ToolInterface } from 'interfaces/tool';
import { CustomerInterface } from 'interfaces/customer';
import { GetQueryInterface } from 'interfaces';

export interface RentalTransactionInterface {
  id?: string;
  rent_date: any;
  due_date: any;
  tool_id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  tool?: ToolInterface;
  customer?: CustomerInterface;
  _count?: {};
}

export interface RentalTransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  tool_id?: string;
  customer_id?: string;
}

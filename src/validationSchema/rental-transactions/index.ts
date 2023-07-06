import * as yup from 'yup';

export const rentalTransactionValidationSchema = yup.object().shape({
  rent_date: yup.date().required(),
  due_date: yup.date().required(),
  tool_id: yup.string().nullable(),
  customer_id: yup.string().nullable(),
});

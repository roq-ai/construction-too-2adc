import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getRentalTransactionById, updateRentalTransactionById } from 'apiSdk/rental-transactions';
import { Error } from 'components/error';
import { rentalTransactionValidationSchema } from 'validationSchema/rental-transactions';
import { RentalTransactionInterface } from 'interfaces/rental-transaction';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ToolInterface } from 'interfaces/tool';
import { CustomerInterface } from 'interfaces/customer';
import { getTools } from 'apiSdk/tools';
import { getCustomers } from 'apiSdk/customers';

function RentalTransactionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RentalTransactionInterface>(
    () => (id ? `/rental-transactions/${id}` : null),
    () => getRentalTransactionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RentalTransactionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRentalTransactionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/rental-transactions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RentalTransactionInterface>({
    initialValues: data,
    validationSchema: rentalTransactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Rental Transaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="rent_date" mb="4">
              <FormLabel>Rent Date</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.rent_date ? new Date(formik.values?.rent_date) : null}
                  onChange={(value: Date) => formik.setFieldValue('rent_date', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="due_date" mb="4">
              <FormLabel>Due Date</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.due_date ? new Date(formik.values?.due_date) : null}
                  onChange={(value: Date) => formik.setFieldValue('due_date', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<ToolInterface>
              formik={formik}
              name={'tool_id'}
              label={'Select Tool'}
              placeholder={'Select Tool'}
              fetcher={getTools}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<CustomerInterface>
              formik={formik}
              name={'customer_id'}
              label={'Select Customer'}
              placeholder={'Select Customer'}
              fetcher={getCustomers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'rental_transaction',
    operation: AccessOperationEnum.UPDATE,
  }),
)(RentalTransactionEditPage);

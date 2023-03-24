import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { get as _get } from 'lodash-es';
import { string as YupString, bool as YupBool, array as YupArray } from 'yup';

import {
  useRegionData,
  useRegionValidation,
} from '../../../../code/address/hooks';
import { __ } from '../../../../../i18n';
import { _emptyFunc } from '../../../../../utils';
import { BILLING_ADDR_FORM } from '../../../../../config';
import LocalStorage from '../../../../../utils/localStorage';
import { formikDataShape } from '../../../../../utils/propTypes';
import { useCheckoutFormContext, useFormSection } from '../../../../../hooks';
import { billingAddressInitialValues } from '../../step/utility/initialValues';
import { BillingAddressFormikContext } from '../../../../code/billingAddress/context';

const emptyCallback = _emptyFunc();
const requiredMessage = __('%1 is required');

const initValidationSchema = {
  company: YupString().nullable(),
  firstname: YupString().required(requiredMessage),
  lastname: YupString().required(requiredMessage),
  street: YupArray().test(
    'street1Required',
    requiredMessage,
    (value) => !!_get(value, 0)
  ),
  phone: YupString().required(requiredMessage),
  zipcode: YupString().required(requiredMessage),
  city: YupString().required(requiredMessage),
  region: YupString().nullable(),
  country: YupString().required(requiredMessage),
  isSameAsShipping: YupBool(),
};

function BillingAddressFormikProvider({ children, formikData }) {
  const { setFieldValue, selectedRegion, selectedCountry } = formikData;
  const [addressOnEdit, setAddressOnEdit] = useState(null);
  const [initialValues, setInitialValues] = useState(
    billingAddressInitialValues
  );
  const { aggregatedData } = useCheckoutFormContext();
  const validationSchema = useRegionValidation(
    selectedCountry,
    initValidationSchema
  );
  const regionData = useRegionData(selectedCountry, selectedRegion);

  const resetBillingAddressFormFields = useCallback(() => {
    setFieldValue(BILLING_ADDR_FORM, {
      ...billingAddressInitialValues,
      isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
    });
  }, [setFieldValue]);

  const setBillingAddressFormFields = useCallback(
    (addressToSet) => {
      setFieldValue(BILLING_ADDR_FORM, {
        ...billingAddressInitialValues,
        ...addressToSet,
        isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
      });
    },
    [setFieldValue]
  );

  const formContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: BILLING_ADDR_FORM,
    submitHandler: emptyCallback,
  });

  // Update initialvalues based on the initial cart data fetch.
  useEffect(() => {
    if (aggregatedData) {
      const billingAddress = aggregatedData?.cart?.billing_address || {};
      const saveInBook = !!aggregatedData?.customer?.customer?.email;
      setInitialValues({
        ...billingAddressInitialValues,
        ...billingAddress,
        saveInBook,
      });
    }
  }, [aggregatedData]);

  const context = useMemo(
    () => ({
      formikData,
      addressOnEdit,
      setAddressOnEdit,
      validationSchema,
      setBillingAddressFormFields,
      resetBillingAddressFormFields,
      ...regionData,
      ...formikData,
      ...formContext,
    }),
    [
      formikData,
      regionData,
      formContext,
      addressOnEdit,
      validationSchema,
      setBillingAddressFormFields,
      resetBillingAddressFormFields,
    ]
  );

  return (
    <BillingAddressFormikContext.Provider value={context}>
      <Form id={BILLING_ADDR_FORM}>{children}</Form>
    </BillingAddressFormikContext.Provider>
  );
}

BillingAddressFormikProvider.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default BillingAddressFormikProvider;

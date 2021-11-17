import React, { useCallback, useState } from 'react';
import _get from 'lodash.get';
import { Form } from 'formik';
import { node } from 'prop-types';
import { string as YupString, bool as YupBool, array as YupArray } from 'yup';

import {
  useRegionData,
  useRegionValidation,
} from '../../../../code/address/hooks';
import { __ } from '../../../../../i18n';
import { _emptyFunc } from '../../../../../utils';
import { useFormSection } from '../../../../../hooks';
import { BILLING_ADDR_FORM } from '../../../../../config';
import LocalStorage from '../../../../../utils/localStorage';
import { formikDataShape } from '../../../../../utils/propTypes';
import { addressInitValues } from '../../../../../utils/address';
import { BillingAddressFormikContext } from '../../../../code/billingAddress/context';

const billingAddressFormInitValues = {
  ...addressInitValues,
  isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
};

const requiredMessage = __('%1 is required');

const initValidationSchema = {
  company: YupString().required(requiredMessage),
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
  const [addressOnEdit, setAddressOnEdit] = useState(null);
  const { setFieldValue, selectedRegion, selectedCountry } = formikData;
  const validationSchema = useRegionValidation(
    selectedCountry,
    initValidationSchema
  );
  const regionData = useRegionData(selectedCountry, selectedRegion);

  const resetBillingAddressFormFields = useCallback(() => {
    setFieldValue(BILLING_ADDR_FORM, {
      ...billingAddressFormInitValues,
      isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
    });
  }, [setFieldValue]);

  const setBillingAddressFormFields = useCallback(
    (addressToSet) => {
      setFieldValue(BILLING_ADDR_FORM, {
        ...billingAddressFormInitValues,
        ...addressToSet,
        isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
      });
    },
    [setFieldValue]
  );

  const formContext = useFormSection({
    formikData,
    validationSchema,
    id: BILLING_ADDR_FORM,
    submitHandler: _emptyFunc(),
    initialValues: billingAddressFormInitValues,
  });

  const context = {
    formikData,
    addressOnEdit,
    setAddressOnEdit,
    validationSchema,
    setBillingAddressFormFields,
    resetBillingAddressFormFields,
    ...regionData,
    ...formikData,
    ...formContext,
  };

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

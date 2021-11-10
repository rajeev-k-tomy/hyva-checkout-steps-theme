import React, { useCallback, useState } from 'react';
import _get from 'lodash.get';
import { Form } from 'formik';
import { node } from 'prop-types';
import { string as YupString, bool as YupBool, array as YupArray } from 'yup';

import { __ } from '../../../../i18n';
import { BILLING_ADDR_FORM } from '../../../../config';
import LocalStorage from '../../../../utils/localStorage';
import { formikDataShape } from '../../../../utils/propTypes';
import { useRegionData, useRegionValidation } from '../../../address/hooks';
import { BillingAddressFormikContext } from '../../../billingAddress/context';
import { billingAddressFormInitValues } from '../../../billingAddress/utility';
import { useFormSection } from '../../../../hook';
import { _emptyFunc } from '../../../../utils';

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
  const [needNewAddress, setNeedNewAddress] = useState(false);
  const [backupAddress, setBackupAddress] = useState(null);
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
    backupAddress,
    needNewAddress,
    setAddressOnEdit,
    validationSchema,
    setBackupAddress,
    setNeedNewAddress,
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
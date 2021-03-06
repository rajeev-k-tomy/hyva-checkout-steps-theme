import React, { useCallback, useEffect, useState } from 'react';
import { get as _get } from 'lodash-es';
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
import { billingAddressInitialValues } from '../../step/utility/initialValues';
import { BillingAddressFormikContext } from '../../../../code/billingAddress/context';

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
  const {
    setFieldValue,
    isBillingSame,
    selectedRegion,
    setFieldTouched,
    selectedCountry,
  } = formikData;
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
    validationSchema,
    id: BILLING_ADDR_FORM,
    submitHandler: _emptyFunc(),
    initialValues: billingAddressInitialValues,
  });

  useEffect(() => {
    if (!isBillingSame) {
      setFieldTouched(BILLING_ADDR_FORM);
    }
  }, [isBillingSame, setFieldTouched]);

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

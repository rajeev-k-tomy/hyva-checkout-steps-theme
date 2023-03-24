import React, { useCallback, useEffect, useState } from 'react';
import {
  array as YupArray,
  string as YupString,
  boolean as YupBoolean,
} from 'yup';
import { Form } from 'formik';
import { node } from 'prop-types';
import { get as _get } from 'lodash-es';

import {
  useRegionData,
  useRegionValidation,
} from '../../../../code/address/hooks';
import { __ } from '../../../../../i18n';
import { useCheckoutFormContext, useFormSection } from '../../../../../hooks';
import { SHIPPING_ADDR_FORM } from '../../../../../config';
import { formikDataShape } from '../../../../../utils/propTypes';
import { shippingAddressInitialValues } from '../../step/utility/initialValues';
import { ShippingAddressFormikContext } from '../../../../code/shippingAddress/context';

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
  isSameAsShipping: YupBoolean(),
};

function ShippingAddressFormikProvider({ children, formikData }) {
  const { setFieldValue, selectedRegion, selectedCountry, setFieldTouched } =
    formikData;
  const [needNewAddress, setNeedNewAddress] = useState(false);
  const [backupAddress, setBackupAddress] = useState(null);
  const [addressOnEdit, setAddressOnEdit] = useState(null);
  const [initialValues, setInitialValues] = useState(
    shippingAddressInitialValues
  );
  const { aggregatedData } = useCheckoutFormContext();
  const regionData = useRegionData(selectedCountry, selectedRegion);
  const validationSchema = useRegionValidation(
    selectedCountry,
    initValidationSchema
  );

  const resetShippingAddressFormFields = useCallback(() => {
    setFieldValue(SHIPPING_ADDR_FORM, { ...shippingAddressInitialValues });
    setFieldTouched(SHIPPING_ADDR_FORM, {});
  }, [setFieldValue, setFieldTouched]);

  const setShippingAddressFormFields = useCallback(
    (addressToSet) =>
      setFieldValue(SHIPPING_ADDR_FORM, {
        ...shippingAddressInitialValues,
        ...addressToSet,
      }),
    [setFieldValue]
  );

  const formSectionContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: SHIPPING_ADDR_FORM,
  });

  // Update initialvalues based on the initial cart data fetch.
  useEffect(() => {
    if (aggregatedData) {
      const shippingAddress = aggregatedData?.cart?.shipping_address || {};
      const saveInBook = !!aggregatedData?.customer?.customer?.email;
      setInitialValues({
        ...shippingAddressInitialValues,
        ...shippingAddress,
        saveInBook,
      });
    }
  }, [aggregatedData]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    formikData,
    backupAddress,
    addressOnEdit,
    needNewAddress,
    validationSchema,
    setAddressOnEdit,
    setBackupAddress,
    setNeedNewAddress,
    setShippingAddressFormFields,
    resetShippingAddressFormFields,
    ...formikData,
    ...regionData,
    ...formSectionContext,
  };

  return (
    <ShippingAddressFormikContext.Provider value={context}>
      <Form id={SHIPPING_ADDR_FORM}>{children}</Form>
    </ShippingAddressFormikContext.Provider>
  );
}

ShippingAddressFormikProvider.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default ShippingAddressFormikProvider;

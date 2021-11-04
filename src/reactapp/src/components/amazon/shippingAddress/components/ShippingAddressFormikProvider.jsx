import React, { useCallback } from 'react';
import {
  array as YupArray,
  string as YupString,
  boolean as YupBoolean,
} from 'yup';
import _get from 'lodash.get';
import { Form } from 'formik';
import { node } from 'prop-types';

import { __ } from '../../../../i18n';
import { SHIPPING_ADDR_FORM } from '../../../../config';
import { initialCountry } from '../../../../utils/address';
import useFormSection from '../../../../hook/useFormSection';
import { formikDataShape } from '../../../../utils/propTypes';
import useRegionData from '../../../address/hooks/useRegionData';
import useRegionValidation from '../../../address/hooks/useRegionValidation';
import ShippingAddressFormikContext from '../context/ShippingAddressFormikContext';

const initialValues = {
  company: '',
  firstname: '',
  lastname: '',
  street: ['', ''],
  phone: '',
  zipcode: '',
  city: '',
  region: '',
  country: initialCountry,
};

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
  // const [isNewAddress, setIsNewAddress] = useState(true);
  // const [backupAddress, setBackupAddress] = useState(null);
  // const [forceFilledAddress, setForceFilledAddress] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(initAddressId);
  // const [customerAddressSelected, setCustomerAddressSelected] = useState(
  //   isValidCustomerAddressId(addressIdInCache)
  // );
  const validationSchema = useRegionValidation(
    selectedCountry,
    initValidationSchema
  );

  const regionData = useRegionData(selectedCountry, selectedRegion);

  const resetShippingAddressFormFields = useCallback(() => {
    setFieldValue(SHIPPING_ADDR_FORM, { ...initialValues });
    setFieldTouched(SHIPPING_ADDR_FORM, {});
  }, [setFieldValue, setFieldTouched]);

  const setShippingAddressFormFields = useCallback(
    (addressToSet) =>
      setFieldValue(SHIPPING_ADDR_FORM, {
        ...initialValues,
        ...addressToSet,
      }),
    [setFieldValue]
  );

  // let context = {
  //   ...regionData,
  //   ...formikData,
  //   formikData,
  //   setShippingAddressFormFields,
  //   resetShippingAddressFormFields,
  // };

  // const handleKeyDown = useEnterActionInForm({
  //   formikData,
  //   validationSchema,
  //   submitHandler: formSubmit,
  // });
  const formSectionContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: SHIPPING_ADDR_FORM,
  });

  const context = {
    formikData,
    validationSchema,
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

import React from 'react';

import { AddressForm } from '../../address';
import { GeneralSection } from '../../common/sections';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import {
  useSaveAddressAction,
  useShippingAddressAppContext,
  useShippingAddressFormContext,
  useShippingAddressCartContext,
} from '../hooks';
import { getShippingUniqueId } from '../utility';
import { useTextInputBlurAction } from '../../../../hook';
import useEnterActionInForm from '../../../../hook/useEnterActionInForm';

function ShippingAddressForm() {
  const { isLoggedIn } = useShippingAddressAppContext();
  const { cartShippingAddress } = useShippingAddressCartContext();
  const { shippingValues, formikData, fields, validationSchema } =
    useShippingAddressFormContext();
  const submitHandler = useSaveAddressAction();
  const handleKeyDown = useEnterActionInForm({
    formikData,
    submitHandler: () => {},
    validationSchema,
  });
  const handleBlur = useTextInputBlurAction({
    formikData,
    submitHandler,
    validationSchema,
    additionalValidation: () =>
      getShippingUniqueId(shippingValues) !==
      getShippingUniqueId(cartShippingAddress),
  });

  return (
    <GeneralSection
      addTopPadding={isLoggedIn}
      title="Add a new delivery address"
    >
      <AddressForm
        fields={fields}
        formikData={formikData}
        actions={{ handleKeyDown, handleBlur }}
      />
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default ShippingAddressForm;

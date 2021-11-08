import React from 'react';

import { AddressForm } from '../../address';
import Button from '../../../common/Button';
import { AddressFormCancelButton } from './button';
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
import { _isObjEmpty, _emptyFunc } from '../../../../utils';
import { isValidCustomerAddressId } from '../../../../utils/address';
import useEnterActionInForm from '../../../../hook/useEnterActionInForm';
import { ROUTE_PATH_SHIPPING } from '../../step/utility';
import { useStepContext } from '../../step/hooks';

const emptyCallback = _emptyFunc();

function ShippingAddressForm() {
  const {
    fields,
    formikData,
    addressOnEdit,
    shippingValues,
    needNewAddress,
    validationSchema,
    setNeedNewAddress,
    setAddressOnEdit,
  } = useShippingAddressFormContext();
  const submitHandler = useSaveAddressAction();
  const { setStepRoutePath } = useStepContext();
  const { cartShippingAddress } = useShippingAddressCartContext();
  const { isLoggedIn, customerAddressList } = useShippingAddressAppContext();
  // We dont want to fire form submit on enter. We are dealing it on the blur.
  // We just need to focus next element upon enter key pressed.
  const handleKeyDown = useEnterActionInForm({
    formikData,
    validationSchema,
    submitHandler: emptyCallback,
  });
  let handleBlur = useTextInputBlurAction({
    formikData,
    submitHandler,
    validationSchema,
    /**
     * This additional validation makes sure, the address submit would not happen
     * if the cart_shipping_address === formik_shipping_address
     */
    additionalValidation: () =>
      getShippingUniqueId(shippingValues) !==
      getShippingUniqueId(cartShippingAddress),
  });

  // When customer edit an address or create a new address, we need to trigger
  // address save using the button and not on field blur
  if (isLoggedIn && (needNewAddress || addressOnEdit)) {
    handleBlur = emptyCallback;
  }

  const handleSaveButtonClick = async () => {
    try {
      if (needNewAddress || !isValidCustomerAddressId(addressOnEdit)) {
        await submitHandler();
      } else {
        await submitHandler(addressOnEdit);
      }

      setNeedNewAddress(false);
      setAddressOnEdit(false);
      setStepRoutePath(ROUTE_PATH_SHIPPING);
    } catch (error) {
      console.error(error);
    }
  };

  if (!_isObjEmpty(customerAddressList) && !needNewAddress && !addressOnEdit) {
    return <></>;
  }

  return (
    <GeneralSection
      id={needNewAddress ? 'add-new-delivery-address' : 'edit-delivery-address'}
      title={
        needNewAddress
          ? 'Add a new delivery address'
          : 'Edit your delivery address'
      }
    >
      <AddressForm
        fields={fields}
        formikData={formikData}
        actions={{ handleKeyDown, handleBlur }}
      />
      {(needNewAddress || addressOnEdit) && (
        <div className="flex items-center justify-center space-x-8">
          <AddressFormCancelButton />
          <Button click={handleSaveButtonClick}>Save</Button>
        </div>
      )}
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default ShippingAddressForm;

import React from 'react';

import { AddressFormCancelButton } from './button';
import Button from '../../../../code/common/Button';
import { GeneralSection } from '../../common/sections';
import { AddressForm, SaveInBookCheckbox } from '../../address';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import BillingSameAsShippingCheckbox from './BillingSameAsShippingCheckbox';
import {
  CART_SHIPPING_ADDRESS,
  isValidCustomerAddressId,
} from '../../../../../utils/address';
import {
  useEnterActionInForm,
  useTextInputBlurAction,
} from '../../../../../hooks';
import {
  useSaveAddressAction,
  useShippingAddressAppContext,
  useShippingAddressCartContext,
  useShippingAddressFormikContext,
} from '../hooks';
import { __ } from '../../../../../i18n';
import { getShippingUniqueId } from '../utility';
import { useStepContext } from '../../step/hooks';
import { ROUTE_PATH_ADDRESS } from '../../step/utility';
import { _isObjEmpty, _emptyFunc } from '../../../../../utils';

const isEditForm = true;
const emptyCallback = _emptyFunc();

function ShippingAddressForm() {
  const {
    fields,
    formikData,
    addressOnEdit,
    shippingValues,
    needNewAddress,
    validationSchema,
    setAddressOnEdit,
    setNeedNewAddress,
  } = useShippingAddressFormikContext();
  const submitHandler = useSaveAddressAction();
  const { setStepRoutePath } = useStepContext();
  const { cartShippingAddress, setCartSelectedShippingAddress } =
    useShippingAddressCartContext();
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

  const handleAddressUpdate = async () => {
    try {
      if (needNewAddress || !isValidCustomerAddressId(addressOnEdit)) {
        await submitHandler();
        setCartSelectedShippingAddress(CART_SHIPPING_ADDRESS);
      } else {
        await submitHandler(addressOnEdit, isEditForm);
      }

      setNeedNewAddress(false);
      setAddressOnEdit(false);
      setStepRoutePath(ROUTE_PATH_ADDRESS);
    } catch (error) {
      console.error(error);
    }
  };

  if (!_isObjEmpty(customerAddressList) && !needNewAddress && !addressOnEdit) {
    return null;
  }

  return (
    <GeneralSection
      id={
        !(isLoggedIn && needNewAddress)
          ? 'add-new-delivery-address'
          : 'edit-delivery-address'
      }
      title={
        !(isLoggedIn && needNewAddress)
          ? __('Add a new delivery address')
          : __('Edit your delivery address')
      }
    >
      <AddressForm
        fields={fields}
        formikData={formikData}
        actions={{ handleKeyDown, handleBlur }}
      >
        <SaveInBookCheckbox fields={fields} formikData={formikData} />
      </AddressForm>
      {(needNewAddress || addressOnEdit) && (
        <div className="flex items-center justify-center space-x-8">
          <AddressFormCancelButton />
          <Button variant="success" click={handleAddressUpdate}>
            Save
          </Button>
        </div>
      )}
      <BillingSameAsShippingCheckbox
        actions={{ updateAddress: handleAddressUpdate }}
      />
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default ShippingAddressForm;

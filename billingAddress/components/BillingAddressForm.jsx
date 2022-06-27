import React from 'react';

import { AddressForm, SaveInBookCheckbox } from '../../address';
import { HorizontalLineSeparator } from '../../common';
import { GeneralSection } from '../../common/sections';
import {
  useEnterActionInForm,
  useTextInputBlurAction,
} from '../../../../../hooks';
import {
  useSaveAddressAction,
  useBillingAddressAppContext,
  useBillingAddressCartContext,
  useBillingAddressFormikContext,
} from '../hooks';
import { _emptyFunc } from '../../../../../utils';
import AddressBookSelector from './AddressBookSelector';
import { getAddressUniqueId } from '../../address/utility';
import { isValidCustomerAddressId } from '../../../../../utils/address';

const emptyCallback = _emptyFunc();

function BillingAddressForm() {
  const {
    fields,
    formikData,
    isBillingSame,
    billingValues,
    addressOnEdit,
    setFieldValue,
    needNewAddress,
    validationSchema,
    billingAddressSelected,
  } = useBillingAddressFormikContext();
  const submitHandler = useSaveAddressAction();
  const { isLoggedIn } = useBillingAddressAppContext();
  const { cartBillingAddress } = useBillingAddressCartContext();

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
     * if the cart_billing_address === formik_billing_address
     */
    additionalValidation: () =>
      getAddressUniqueId(billingValues) !==
      getAddressUniqueId(cartBillingAddress),
  });

  // When customer edit an address or create a new address, we need to trigger
  // address save using the button and not on field blur
  if (isLoggedIn && (needNewAddress || addressOnEdit)) {
    handleBlur = emptyCallback;
  }

  const handleSaveBookChange = async (event) => {
    const isChecked = event?.target?.checked;
    setFieldValue(fields.saveInBook, isChecked);
    await submitHandler(billingAddressSelected, { saveInBook: isChecked });
  };

  if (isBillingSame) {
    return null;
  }

  return (
    <GeneralSection
      addTopPadding
      id="add-new-billing-address"
      title="Add a new billing address"
    >
      <AddressBookSelector />
      {!isValidCustomerAddressId(billingAddressSelected) && (
        <AddressForm
          fields={fields}
          formikData={formikData}
          actions={{ handleKeyDown, handleBlur }}
        >
          <SaveInBookCheckbox
            fields={fields}
            formikData={formikData}
            actions={{ handleChange: handleSaveBookChange }}
          />
        </AddressForm>
      )}
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default BillingAddressForm;

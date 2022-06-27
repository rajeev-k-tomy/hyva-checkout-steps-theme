import React, { useEffect } from 'react';

import { SelectInput } from '../../common/form';
import { SubSection } from '../../common/sections';
import {
  useSaveAddressAction,
  useBillingAddressAppContext,
  useBillingAddressCartContext,
  useBillingAddressFormikContext,
} from '../hooks';
import { _objToArray } from '../../../../../utils';
import { prepareOtherAddressData } from '../../address/utility';
import { isValidCustomerAddressId } from '../../../../../utils/address';
import { billingAddressSelectorField, CART_BILLING_ADDRESS } from '../utility';

function AddressBookSelector() {
  const submitHandler = useSaveAddressAction();
  const { cartBillingAddress } = useBillingAddressCartContext();
  const { isLoggedIn, customerAddressList } = useBillingAddressAppContext();
  const { formikData, setFieldValue, resetBillingAddressFormFields } =
    useBillingAddressFormikContext();
  const cartBillingAddressId = cartBillingAddress?.id;
  const addressItems = _objToArray(customerAddressList).map((address) => {
    const addressCardData = prepareOtherAddressData(address);
    return { value: address.id.toString(), label: addressCardData.label };
  });
  const options = [
    { value: CART_BILLING_ADDRESS, label: 'Create a new billing address' },
    ...addressItems,
  ];

  const handleAddressSelect = async (event) => {
    const addressSelected = event.target.value;
    setFieldValue(billingAddressSelectorField, addressSelected);

    if (isValidCustomerAddressId(addressSelected)) {
      await submitHandler(addressSelected);
      return;
    }

    // new address requested
    resetBillingAddressFormFields();
  };

  useEffect(() => {
    setFieldValue(billingAddressSelectorField, cartBillingAddressId);
  }, [setFieldValue, cartBillingAddressId]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <SubSection title="Choose your billing address">
      <SelectInput
        options={options}
        formikData={formikData}
        placeholder="Select your address"
        name={billingAddressSelectorField}
        actions={{ change: handleAddressSelect }}
      />
    </SubSection>
  );
}

export default AddressBookSelector;

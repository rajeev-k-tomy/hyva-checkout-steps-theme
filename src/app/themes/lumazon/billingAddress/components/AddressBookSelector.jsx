import React from 'react';

import { SelectInput } from '../../common/form';
import { SubSection } from '../../common/sections';
import {
  useSaveAddressAction,
  useBillingAddressAppContext,
  useBillingAddressFormikContext,
} from '../hooks';
import { _objToArray, _isObjEmpty } from '../../../../../utils';
import { prepareOtherAddressData } from '../../address/utility';

const fieldName = 'billingCustomerAddressSelector';

function AddressBookSelector() {
  const submitHandler = useSaveAddressAction();
  const { customerAddressList } = useBillingAddressAppContext();
  const { formikData, setFieldValue } = useBillingAddressFormikContext();
  const addressItems = _objToArray(customerAddressList).map((address) => {
    const addressCardData = prepareOtherAddressData(address);
    return { value: address.id, label: addressCardData.label };
  });

  const handleAddressSelect = async (event) => {
    const addressSelected = event.target.value;
    await submitHandler(addressSelected);
    setFieldValue(fieldName, '');
  };

  if (_isObjEmpty(customerAddressList)) {
    return <></>;
  }

  return (
    <SubSection title="Choose from your address book">
      <SelectInput
        name={fieldName}
        options={addressItems}
        formikData={formikData}
        placeholder="Select your address"
        actions={{ change: handleAddressSelect }}
      />
    </SubSection>
  );
}

export default AddressBookSelector;

import React from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';

import {
  useShippingAddressCartContext,
  useShippingAddressFormikContext,
} from '../../hooks';
import { useStepContext } from '../../../step/hooks';
import { classNames } from '../../../../../../utils';
import { isValidCustomerAddressId } from '../../../../../../utils/address';

function AddNewAddressButton() {
  const {
    needNewAddress,
    shippingValues,
    setBackupAddress,
    setNeedNewAddress,
    resetShippingAddressFormFields,
  } = useShippingAddressFormikContext();
  const { selectedAddressId } = useShippingAddressCartContext();
  const { setStepRoutePath } = useStepContext();

  const handleNewAddressClick = () => {
    setBackupAddress(shippingValues);
    resetShippingAddressFormFields();
    setNeedNewAddress(true);
    setStepRoutePath('add-new-delivery-address');
  };

  if (!isValidCustomerAddressId(selectedAddressId)) {
    return null;
  }

  return (
    <button
      type="button"
      disabled={needNewAddress}
      onClick={handleNewAddressClick}
      className={classNames(
        needNewAddress ? 'cursor-not-allowed opacity-40' : '',
        'flex items-center justify-center pr-6 hover:text-blue-800'
      )}
    >
      <PlusSmIcon className="w-8 h-8" />
      <span className="hover:underline">Add new address</span>
    </button>
  );
}

export default AddNewAddressButton;

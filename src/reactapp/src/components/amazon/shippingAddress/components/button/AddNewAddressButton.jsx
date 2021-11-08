import React from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';
import {
  // useSaveAddressAction,
  // useShippingAddressAppContext,
  useShippingAddressFormContext,
  // useShippingAddressCartContext,
} from '../../hooks';
import { classNames } from '../../../../../utils';
import { useStepContext } from '../../../step/hooks';

function AddNewAddressButton() {
  const {
    needNewAddress,
    shippingValues,
    setBackupAddress,
    setNeedNewAddress,
    resetShippingAddressFormFields,
  } = useShippingAddressFormContext();
  const { setStepRoutePath } = useStepContext();

  const handleNewAddressClick = () => {
    setBackupAddress(shippingValues);
    resetShippingAddressFormFields();
    setNeedNewAddress(true);
    setStepRoutePath('add-new-delivery-address');
  };

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

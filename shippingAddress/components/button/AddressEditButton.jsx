import React from 'react';
import { number, oneOfType, string } from 'prop-types';

import {
  useShippingAddressAppContext,
  useShippingAddressFormikContext,
} from '../../hooks';
import {
  isValidCustomerAddressId,
  prepareFormAddressFromCartAddress,
} from '../../../../../../utils/address';
import { useStepContext } from '../../../step/hooks';

function AddressEditButton({ addressId }) {
  const {
    shippingValues,
    setBackupAddress,
    setAddressOnEdit,
    setShippingAddressFormFields,
  } = useShippingAddressFormikContext();
  const { setStepRoutePath } = useStepContext();
  const { customerAddressList } = useShippingAddressAppContext();
  let addressToBackup = shippingValues;

  if (isValidCustomerAddressId(addressId)) {
    addressToBackup = customerAddressList[addressId];
  }

  const handleEditAddressClick = () => {
    setBackupAddress(addressToBackup);
    setShippingAddressFormFields(
      prepareFormAddressFromCartAddress(addressToBackup)
    );
    setAddressOnEdit(addressId);
    setStepRoutePath('edit-delivery-address');
  };

  return (
    <button
      type="button"
      onClick={handleEditAddressClick}
      className="flex-1 py-3 shadow-inner hover:text-blue-800"
    >
      <b>Edit</b>
    </button>
  );
}

AddressEditButton.propTypes = {
  addressId: oneOfType([number, string]),
};

AddressEditButton.defaultProps = {
  addressId: 'active_address',
};

export default AddressEditButton;

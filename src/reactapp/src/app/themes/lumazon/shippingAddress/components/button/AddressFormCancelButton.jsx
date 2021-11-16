import React from 'react';

import Button from '../../../../../code/common/Button';
import { useStepContext } from '../../../step/hooks';
import { ROUTE_PATH_ADDRESS } from '../../../step/utility';
import { useShippingAddressFormikContext } from '../../hooks';

function AddressFormCancelButton() {
  const {
    backupAddress,
    setAddressOnEdit,
    setNeedNewAddress,
    setShippingAddressFormFields,
  } = useShippingAddressFormikContext();
  const { setStepRoutePath } = useStepContext();

  const handleFormCancel = () => {
    setShippingAddressFormFields(backupAddress);
    setNeedNewAddress(false);
    setAddressOnEdit(false);
    setStepRoutePath(ROUTE_PATH_ADDRESS);
  };

  return (
    <Button variant="warning" click={handleFormCancel}>
      Cancel
    </Button>
  );
}

export default AddressFormCancelButton;

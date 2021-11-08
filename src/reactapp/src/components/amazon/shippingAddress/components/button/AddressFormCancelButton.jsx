import React from 'react';

import Button from '../../../../common/Button';
import { useStepContext } from '../../../step/hooks';
import { ROUTE_PATH_SHIPPING } from '../../../step/utility';
import { useShippingAddressFormContext } from '../../hooks';

function AddressFormCancelButton() {
  const { setStepRoutePath } = useStepContext();
  const {
    backupAddress,
    setAddressOnEdit,
    setNeedNewAddress,
    setShippingAddressFormFields,
  } = useShippingAddressFormContext();

  const handleFormCancel = () => {
    setShippingAddressFormFields(backupAddress);
    setNeedNewAddress(false);
    setAddressOnEdit(false);
    setStepRoutePath(ROUTE_PATH_SHIPPING);
  };

  return (
    <Button variant="warning" click={handleFormCancel}>
      Cancel
    </Button>
  );
}

export default AddressFormCancelButton;

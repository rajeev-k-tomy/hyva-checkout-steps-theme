import React from 'react';
import { bool, number, oneOfType, string } from 'prop-types';

import { useSaveAddressAction } from '../../hooks';
import { classNames } from '../../../../../../utils';

function AddressChooseButton({ disabled, addressId }) {
  const submitHandler = useSaveAddressAction();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => submitHandler(addressId)}
      className={classNames(
        disabled ? 'opacity-40 cursor-not-allowed' : '',
        'flex-1 py-3 shadow-inner hover:text-blue-800'
      )}
    >
      Choose
    </button>
  );
}

AddressChooseButton.propTypes = {
  disabled: bool,
  addressId: oneOfType([string, number]).isRequired,
};

AddressChooseButton.defaultProps = {
  disabled: false,
};

export default AddressChooseButton;

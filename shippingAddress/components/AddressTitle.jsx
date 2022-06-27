import React from 'react';
import { oneOfType, shape, string, number } from 'prop-types';

import { getAddressTitle } from '../utility';

function AddressTitle({ address }) {
  return (
    <div className="flex items-center justify-center w-3/5">
      <b className="text-xs text-gray-500">{getAddressTitle(address)}</b>
    </div>
  );
}

AddressTitle.propTypes = {
  address: shape({ id: oneOfType([string, number]) }).isRequired,
};

export default AddressTitle;

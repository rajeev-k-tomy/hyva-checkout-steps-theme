import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { AddressChooseButton } from '../shippingAddress/components/button';
import { prepareOtherAddressData } from './utility';
import { getAddressTitle } from '../shippingAddress/utility';

function OtherAddressList({ list }) {
  const addressList = list.map((address) => prepareOtherAddressData(address));

  return (
    <ul className="space-y-3">
      {addressList.map((addressData) => (
        <li
          key={addressData.id}
          className="flex items-center overflow-hidden bg-white shadow sm:rounded-md hover:border hover:border-gray-400"
        >
          <div className="flex-1 px-4">
            <span className="text-sm italic">{addressData.label}</span>
          </div>
          <div className="w-1/4">
            <div className="flex flex-col w-full text-sm divide-y bg-gray-50">
              <div className="flex items-center justify-center h-10">
                <b className="text-xs text-gray-500">
                  {getAddressTitle(addressData)}
                </b>
              </div>
              <AddressChooseButton addressId={addressData.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

OtherAddressList.propTypes = {
  list: arrayOf(shape({ firstname: string })).isRequired,
};

export default OtherAddressList;

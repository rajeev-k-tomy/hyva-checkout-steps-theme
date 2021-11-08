import React, { useMemo } from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

import OtherAddressList from '../../address/OtherAddressList';
import AddNewAddressButton from './button/AddNewAddressButton';
import { AddressChooseButton, AddressEditButton } from './button';
import { GeneralSection, SubSection } from '../../common/sections';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import {
  useShippingAddressAppContext,
  useShippingAddressCartContext,
  useShippingAddressFormContext,
} from '../hooks';
import { prepareAddressCardListData } from '../utility';
import { classNames, _isObjEmpty } from '../../../../utils';

function ShippingAddressList() {
  const { needNewAddress, addressOnEdit } = useShippingAddressFormContext();
  const { customerAddressList, defaultShippingAddress } =
    useShippingAddressAppContext();
  const { cartShippingAddress, selectedAddressId } =
    useShippingAddressCartContext();
  const hasCustomerAddress = !_isObjEmpty(customerAddressList);

  const { recentAddresses, otherAddresses } = useMemo(
    () =>
      prepareAddressCardListData({
        selectedAddressId,
        customerAddressList,
        cartShippingAddress,
        defaultShippingAddress,
      }),
    [
      selectedAddressId,
      customerAddressList,
      cartShippingAddress,
      defaultShippingAddress,
    ]
  );

  if (!hasCustomerAddress || needNewAddress || addressOnEdit) {
    return <></>;
  }

  return (
    <GeneralSection
      title="Select a delivery address"
      titleRightContent={<AddNewAddressButton />}
    >
      <SubSection title="Most recently used">
        <div className="flex items-start justify-between space-x-8">
          {recentAddresses.map((addressCard, index) => (
            <div key={addressCard.id} className="flex-1">
              <div
                className={classNames(
                  index === 0 ? 'border border-primary-lighter' : '',
                  'overflow-hidden bg-white rounded-lg shadow hover:border hover:border-gray-400'
                )}
              >
                <div className="px-4 py-5 space-y-3 sm:p-6">
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <h4 className="pb-1 text-base font-semibold">
                        {addressCard.name}
                      </h4>
                      {index === 0 ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-800" />
                      ) : (
                        <input type="radio" name="shipping_address.addressId" />
                      )}
                    </li>
                    {addressCard.lines.map((addressLine) => (
                      <li key={addressLine.id}>{addressLine.label}</li>
                    ))}
                    <li>
                      <span>Phone:</span>
                      {addressCard.phone}
                    </li>
                  </ul>
                </div>
                <div className="flex w-full text-sm divide-x bg-gray-50">
                  <AddressChooseButton
                    disabled={index === 0}
                    addressId={addressCard.id}
                  />
                  <AddressEditButton addressId={addressCard.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Other address options">
        <OtherAddressList list={otherAddresses} />
      </SubSection>

      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default ShippingAddressList;

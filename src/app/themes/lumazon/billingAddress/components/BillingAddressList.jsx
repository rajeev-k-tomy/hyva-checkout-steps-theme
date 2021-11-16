import React, { useMemo } from 'react';
import { PlusSmIcon } from '@heroicons/react/solid';

import BillingAddress from './BillingAddress';
import { OtherAddressList } from '../../address';
import { GeneralSection, SubSection } from '../../common/sections';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import { useBillingAddressAppContext, useBillingAddressCartContext, useBillingAddressFormikContext } from '../hooks';
import { _isObjEmpty } from '../../../../utils';
import { prepareAddressCardListData } from '../../shippingAddress/utility';

function BillingAddressList() {
  const { needNewAddress, addressOnEdit } = useBillingAddressFormikContext();
  const { customerAddressList, defaultShippingAddress } =
    useBillingAddressAppContext();
  const { cartShippingAddress, selectedAddressId } =
    useBillingAddressCartContext();
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
  return (
    <GeneralSection
      title="Select a billing address"
      addTopPadding
      titleRightContent={
        <div className="flex items-center justify-center pr-6 cursor-pointer hover:text-blue-800">
          <PlusSmIcon className="w-8 h-8" />
          <span className="hover:underline">Add new address</span>
        </div>
      }
    >
      <SubSection title="Available billing addresses">
        <OtherAddressList />
      </SubSection>

      <BillingAddress />

      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default BillingAddressList;

import { get as _get } from 'lodash-es';

import {
  isCartAddressValid,
  isValidCustomerAddressId,
} from '../../../../../utils/address';
import { getAddressUniqueId } from '../../address/utility';
import { _isObjEmpty, _objToArray } from '../../../../../utils';
import { prepareFullName } from '../../../../../utils/customer';

export function getShippingUniqueId(shippingValues) {
  return getAddressUniqueId(shippingValues);
}

export function prepareAddressCardData(address) {
  const { id, street, city, country, countryCode, region, zipcode, phone } =
    address;
  const street1 = _get(street, 0);
  const street2 = _get(street, 1);
  const streets = street1 + (street2 ? ` ${street2}` : '');
  const cityState = city + (region ? `, ${region}` : '');

  return {
    id: id || 'new_address',
    name: prepareFullName(address),
    phone,
    lines: [
      { id: 'streets', label: streets },
      { id: 'cityState', label: cityState },
      { id: 'countryZip', label: `${country || countryCode || ''} ${zipcode}` },
    ],
  };
}

export function prepareAddressCardListData({
  selectedAddressId,
  customerAddressList,
  cartShippingAddress,
  defaultShippingAddress,
}) {
  const recentAddresses = [];
  const hasCustomerAddress = !_isObjEmpty(customerAddressList);
  const recentAddressIds = [selectedAddressId];
  const customerAddressListArray = _objToArray(customerAddressList);

  if (isCartAddressValid(cartShippingAddress)) {
    recentAddresses.push(
      prepareAddressCardData({
        id: selectedAddressId,
        ...cartShippingAddress,
      })
    );
  }
  if (hasCustomerAddress) {
    const defaultAddress = customerAddressList[defaultShippingAddress];
    const [firstAddress, secondAddress] = customerAddressListArray.filter(
      (address) => address.id !== selectedAddressId
    );

    if (defaultAddress && defaultShippingAddress !== selectedAddressId) {
      recentAddresses.push(prepareAddressCardData(defaultAddress));
      recentAddressIds.push(defaultShippingAddress);
    } else {
      if (firstAddress) {
        recentAddresses.push(prepareAddressCardData(firstAddress));
        recentAddressIds.push(firstAddress.id);
      }
      if (recentAddresses.length < 2 && secondAddress) {
        recentAddresses.push(prepareAddressCardData(secondAddress));
        recentAddressIds.push(secondAddress.id);
      }
    }
  }

  const otherAddresses = customerAddressListArray.filter(
    (address) => !recentAddressIds.includes(address.id)
  );

  return { recentAddresses, otherAddresses };
}

export function getAddressTitle(address, defaultId) {
  if (address.id === defaultId) {
    return 'DEFAULT ADDRESS';
  }
  if (isValidCustomerAddressId(address.id)) {
    return 'FROM ADDRESS BOOK';
  }

  return 'NEW ADDRESS';
}

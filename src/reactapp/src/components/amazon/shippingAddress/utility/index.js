import _get from 'lodash.get';

import { _isObjEmpty, _objToArray } from '../../../../utils';
import { prepareFullName } from '../../../../utils/customer';
import { isCartAddressValid } from '../../../../utils/address';

export function getShippingUniqueId(shippingValues) {
  const {
    firstname,
    lastname,
    company,
    street,
    city,
    zipcode,
    country,
    region,
    phone,
  } = shippingValues;
  const lastSaved = `${firstname}__${lastname}__${company}__${_get(
    street,
    0
  )}__${_get(street, 1)}__${city}__${zipcode}__${country}__${region}__${phone}`;

  return lastSaved;
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

export function prepareOtherAddressData(address) {
  const { id, street, city, country, countryCode, region, zipcode, phone } =
    address;
  const street1 = _get(street, 0);
  const street2 = _get(street, 1) || '';

  const pincode = zipcode ? `pincode: ${zipcode}` : '';
  const phoneNumber = phone ? `Ph: ${phone}` : '';

  const addressArray = [
    prepareFullName(address),
    `${street1} ${street2}`,
    city,
    region,
    country || countryCode || '',
    pincode,
    phoneNumber,
  ].filter((i) => i);

  return {
    id,
    label: addressArray.join(', '),
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
      recentAddresses.push(prepareAddressCardData(firstAddress));
      recentAddressIds.push(firstAddress.id);
      if (recentAddresses.length < 2) {
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

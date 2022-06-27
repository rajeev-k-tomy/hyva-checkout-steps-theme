import { get as _get } from 'lodash-es';

import { initialCountry } from '../../../../../utils/address';
import { prepareFullName } from '../../../../../utils/customer';

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

export function getAddressUniqueId(addressValues) {
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
  } = addressValues;
  const addressId = `${firstname}__${lastname}__${company}__${_get(
    street,
    0
  )}__${_get(street, 1)}__${city}__${zipcode}__${country}__${region}__${phone}`;

  return addressId;
}

export function initialAddressValues() {
  const initialValues = {
    company: '',
    firstname: '',
    lastname: '',
    street: ['', ''],
    phone: '',
    zipcode: '',
    city: '',
    region: '',
    country: initialCountry,
  };

  return initialValues;
}

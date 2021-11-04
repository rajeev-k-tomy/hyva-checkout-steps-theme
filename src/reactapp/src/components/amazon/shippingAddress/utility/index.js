import _get from 'lodash.get';

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

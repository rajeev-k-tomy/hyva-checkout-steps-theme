import { useCallback, useEffect, useState } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import { useAppContext } from '../../../../hooks';
import { BILLING_ADDR_FORM, SHIPPING_ADDR_FORM } from '../../../../config';

const billingCountryField = `${BILLING_ADDR_FORM}.country`;
const shippingCountryField = `${SHIPPING_ADDR_FORM}.country`;

function AddressWrapper({ children }) {
  const [countryStatesFetched, setCountryStatesFetched] = useState([]);
  const { values } = useFormikContext();
  const { fetchCountryStates } = useAppContext();
  const billingCountry = _get(values, billingCountryField);
  const shippingCountry = _get(values, shippingCountryField);

  const countryStatePromise = useCallback(
    async (countryId) => {
      try {
        await fetchCountryStates(countryId);
        setCountryStatesFetched([...countryStatesFetched, countryId]);
      } catch (error) {
        console.error(error);
      }
    },
    [fetchCountryStates, countryStatesFetched]
  );

  useEffect(() => {
    let country;
    if (shippingCountry && !countryStatesFetched.includes(shippingCountry)) {
      country = shippingCountry;
    }
    if (
      !country &&
      billingCountry &&
      !countryStatesFetched.includes(billingCountry)
    ) {
      country = billingCountry;
    }
    if (country) {
      countryStatePromise(country);
    }
  }, [billingCountry, shippingCountry, countryStatePromise]);

  return children;
}

export default AddressWrapper;

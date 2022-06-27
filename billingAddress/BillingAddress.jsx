import React, { useMemo } from 'react';
import { get as _get } from 'lodash-es';
import { set as _set } from 'lodash-es';
import { useFormikContext } from 'formik';

import BillingAddressMemorized from './BillingAddressMemorized';
import { __ } from '../../../../i18n';
import { BILLING_ADDR_FORM } from '../../../../config';
import { useFormikMemorizer } from '../../../../hooks';
import { billingAddressSelectorField } from './utility';
import { billingSameAsShippingField } from '../../../../utils/address';

const regionField = `${BILLING_ADDR_FORM}.region`;
const countryField = `${BILLING_ADDR_FORM}.country`;

function BillingAddress() {
  const { values } = useFormikContext();
  const formSectionData = useFormikMemorizer(BILLING_ADDR_FORM);
  const selectedRegion = _get(values, regionField);
  const selectedCountry = _get(values, countryField);
  const isBillingSame = _get(values, billingSameAsShippingField);
  const billingAddressSelected = _get(values, billingAddressSelectorField);
  const { formSectionValues, formSectionErrors, isFormSectionTouched } =
    formSectionData;
  const streetError = _get(formSectionErrors, 'street');

  if (streetError) {
    _set(
      formSectionErrors,
      'street[0]',
      __('%1 is required', 'Street Address')
    );
  }

  const billingFormikData = useMemo(
    () => ({
      ...formSectionData,
      isBillingSame,
      selectedRegion,
      selectedCountry,
      formSectionErrors,
      billingAddressSelected,
      billingValues: formSectionValues,
      isBillingAddressTouched: isFormSectionTouched,
    }),
    [
      isBillingSame,
      selectedRegion,
      formSectionData,
      selectedCountry,
      formSectionErrors,
      formSectionValues,
      isFormSectionTouched,
      billingAddressSelected,
    ]
  );

  return <BillingAddressMemorized formikData={billingFormikData} />;
}

export default BillingAddress;

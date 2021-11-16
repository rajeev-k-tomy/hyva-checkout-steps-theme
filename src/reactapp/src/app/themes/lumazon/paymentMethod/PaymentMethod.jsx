import React, { useMemo } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

import PaymentMethodMemorized from './PaymentMethodMemorized';
import useFormikMemorizer from '../../../hook/useFormikMemorizer';
import { CHECKOUT_AGREEMENTS_FORM, PAYMENT_METHOD_FORM } from '../../../config';

function PaymentMethod() {
  const { values } = useFormikContext();
  const formikSectionData = useFormikMemorizer(PAYMENT_METHOD_FORM);
  const agreementsValues = _get(values, CHECKOUT_AGREEMENTS_FORM);

  const paymentFormikData = useMemo(
    () => ({
      ...formikSectionData,
      agreementsValues,
      paymentValues: formikSectionData.formSectionValues,
    }),
    [formikSectionData, agreementsValues]
  );

  return <PaymentMethodMemorized formikData={paymentFormikData} />;
}

export default PaymentMethod;

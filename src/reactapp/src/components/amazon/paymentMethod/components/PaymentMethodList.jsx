import React, { useEffect, useState } from 'react';

import { VerticalTabSelector } from '../../common/form';
import { GeneralSection, WellSection } from '../../common/sections';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import BillingSameAsShippingCheckbox from './BillingSameAsShippingCheckbox';
import {
  usePaymentMethodCartContext,
  usePaymentMethodFormContext,
} from '../../../paymentMethod/hooks';
import { _objToArray } from '../../../../utils';
import { PAYMENT_METHOD_FORM } from '../../../../config';

function PaymentMethodList() {
  const [selected, setSelected] = useState('');
  const [isBillingSame, setIsBillingSame] = useState(true);
  const { methodList } = usePaymentMethodCartContext();
  const { setFieldValue, submitHandler, paymentValues } =
    usePaymentMethodFormContext();
  const paymentMethodSelected = paymentValues?.code;

  const updatePaymentMethod = async (methodSelected) => {
    try {
      setFieldValue(PAYMENT_METHOD_FORM, { code: methodSelected });
      await submitHandler(methodSelected);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelected(paymentMethodSelected);
  }, [paymentMethodSelected]);

  return (
    <GeneralSection title="Select a payment method">
      <BillingSameAsShippingCheckbox
        isBillingSame={isBillingSame}
        actions={{ setIsBillingSame }}
      />
      <WellSection>
        <VerticalTabSelector
          items={_objToArray(methodList).map((method) => ({
            ...method,
            id: method.code,
          }))}
          selected={selected}
          actions={{ setSelected: updatePaymentMethod }}
          fieldName="paymentMethod"
        />
      </WellSection>
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default PaymentMethodList;

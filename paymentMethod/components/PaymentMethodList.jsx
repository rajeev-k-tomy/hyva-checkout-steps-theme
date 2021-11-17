import React, { useEffect, useState } from 'react';
import _get from 'lodash.get';
import { object } from 'prop-types';

import { VerticalTabSelector } from '../../common/form';
import { GeneralSection, WellSection } from '../../common/sections';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import {
  usePaymentMethodCartContext,
  usePaymentMethodFormContext,
} from '../../../../code/paymentMethod/hooks';
import { _objToArray } from '../../../../../utils';
import { PAYMENT_METHOD_FORM } from '../../../../../config';

function PaymentMethodList({ methodRenderers }) {
  const [selected, setSelected] = useState('');
  const { methodList } = usePaymentMethodCartContext();
  const { setFieldValue, submitHandler, paymentValues } =
    usePaymentMethodFormContext();
  const paymentMethodSelected = paymentValues?.code;

  const updatePaymentMethod = async (event) => {
    const methodSelected = event.target
      ? _get(methodList, `${event.target.value}.code`)
      : event;

    setFieldValue(PAYMENT_METHOD_FORM, { code: methodSelected });

    // don't need to save payment method in case the method opted has a custom
    // renderer. This is because custom payment renderers may have custom
    // functionalities associated with them. So if in case they want to perform
    // save payment operation upon selection, then they need to deal with it there.
    if (methodRenderers[methodSelected]) {
      return;
    }

    await submitHandler(methodSelected);
  };

  useEffect(() => {
    setSelected(paymentMethodSelected);
  }, [paymentMethodSelected]);

  return (
    <GeneralSection title="Select a payment method">
      {_objToArray(methodList).map((method) => {
        const MethodRenderer = methodRenderers[method.code];
        if (MethodRenderer) {
          return (
            <MethodRenderer
              key={method.code}
              method={method}
              selected={paymentValues || {}}
              actions={{ change: updatePaymentMethod }}
            />
          );
        }
        return (
          <WellSection key={method.code}>
            <VerticalTabSelector
              items={[
                {
                  ...method,
                  id: method.code,
                },
              ]}
              selected={selected}
              actions={{ setSelected: updatePaymentMethod }}
              fieldName="paymentMethod"
            />
          </WellSection>
        );
      })}
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

PaymentMethodList.propTypes = {
  methodRenderers: object,
};

PaymentMethodList.defaultProps = {
  methodRenderers: {},
};

export default PaymentMethodList;

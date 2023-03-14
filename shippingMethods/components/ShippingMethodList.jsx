import React, { useEffect, useState } from 'react';

import { VerticalTabSelector } from '../../common/form';
import { GeneralSection, WellSection } from '../../common/sections';
import {
  useShippingMethodCartContext,
  useShippingMethodFormContext,
} from '../../../../code/shippingMethod/hooks';
import { __ } from '../../../../../i18n';
import { _objToArray } from '../../../../../utils';
import { SHIPPING_METHOD } from '../../../../../config';

function ShippingMethodList() {
  const [selected, setSelected] = useState();
  const { methodList } = useShippingMethodCartContext();
  const { selectedMethod, setFieldValue, submitHandler } =
    useShippingMethodFormContext();

  const methodItems = _objToArray(methodList).map((method) => ({
    id: method.id,
    title: (
      <div className="flex items-center justify-between text-secondary">
        <h2>{method.carrierTitle}</h2>
        <strong>{method.price}</strong>
      </div>
    ),
  }));

  const updateShippingMethod = async (methodId) => {
    const [carrierCode, methodCode] = methodId.split('__');
    const newSelectedMethod = { carrierCode, methodCode };
    try {
      setFieldValue(SHIPPING_METHOD, newSelectedMethod);
      await submitHandler(newSelectedMethod);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSelected(`${selectedMethod.carrierCode}__${selectedMethod.methodCode}`);
  }, [selectedMethod]);

  return (
    <GeneralSection title={__('Select a shipping method')}>
      <WellSection>
        <VerticalTabSelector
          selected={selected}
          items={methodItems}
          fieldName="shippingMethod"
          actions={{ setSelected: updateShippingMethod }}
        />
      </WellSection>
    </GeneralSection>
  );
}

export default ShippingMethodList;

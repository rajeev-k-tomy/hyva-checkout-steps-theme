/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { SHIPPING_METHOD } from '../../../../config';
import { _objToArray } from '../../../../utils';
import {
  useShippingMethodCartContext,
  useShippingMethodFormContext,
} from '../../../shippingMethod/hooks';

import { VerticalTabSelector } from '../../common/form';
import { GeneralSection, WellSection } from '../../common/sections';

function ShippingMethodList() {
  const [selected, setSelected] = useState();
  const { methodList } = useShippingMethodCartContext();
  const { selectedMethod, setFieldValue, submitHandler } =
    useShippingMethodFormContext();
  const selectedItem = methodList[selected];

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
    <GeneralSection title="Select a shipping method" addTopPadding>
      <WellSection>
        <VerticalTabSelector
          selected={selected}
          actions={{ setSelected: updateShippingMethod }}
          items={_objToArray(methodList).map((method) => ({
            id: method.id,
            title: method.carrierTitle,
          }))}
          fieldName="shippingMethod"
        >
          <div className="px-4 py-5 sm:p-6">
            <h4 className="pb-4 text-base font-semibold underline">
              {selectedItem?.carrierTitle}
            </h4>
            <p>
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer nec odio. Praesent libero.
            </p>
            <strong className="inline-block pt-6">{selectedItem?.price}</strong>
          </div>
        </VerticalTabSelector>
      </WellSection>
    </GeneralSection>
  );
}

export default ShippingMethodList;

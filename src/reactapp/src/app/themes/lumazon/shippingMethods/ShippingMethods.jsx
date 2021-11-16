import React, { useMemo } from 'react';

import { SHIPPING_METHOD } from '../../../../config';
import { useFormikMemorizer } from '../../../../hooks';
import ShippingMethodsMemorized from './ShippingMethodsMemorized';

function ShippingMethodsForm() {
  const formikSectionData = useFormikMemorizer(SHIPPING_METHOD);

  const shippingFormikData = useMemo(
    () => ({
      ...formikSectionData,
      selectedMethod: formikSectionData.formSectionValues || {},
    }),
    [formikSectionData]
  );
  return <ShippingMethodsMemorized formikData={shippingFormikData} />;
}

export default ShippingMethodsForm;

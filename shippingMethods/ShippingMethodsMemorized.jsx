import React from 'react';

import ShippingMethodList from './components/ShippingMethodList';
import { ShippingMethodFormManager } from '../../../code/shippingMethod/components';
import { useStepContext } from '../step/hooks';
import { SHIPPING_STEP } from '../step/utility';
import { formikDataShape } from '../../../../utils/propTypes';
import customRenderers from '../../../../shippingMethods/customRenderers';

const ShippingMethodsMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();

  return (
    <ShippingMethodFormManager formikData={formikData}>
      {currentStep === SHIPPING_STEP && (
        <ShippingMethodList methodRenderers={customRenderers} />
      )}
    </ShippingMethodFormManager>
  );
});

ShippingMethodsMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingMethodsMemorized;

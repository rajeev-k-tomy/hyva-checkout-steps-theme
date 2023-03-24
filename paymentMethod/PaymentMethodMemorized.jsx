import React from 'react';

import PaymentMethodList from './components/PaymentMethodList';
import { PaymentMethodFormManager } from '../../../code/paymentMethod/components';
import { useStepContext } from '../step/hooks';
import { PAYMENT_STEP } from '../step/utility';
import { formikDataShape } from '../../../../utils/propTypes';
import customRenderers from '../../../../paymentMethods/customRenderers';

const PaymentMethodMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();

  return (
    <PaymentMethodFormManager formikData={formikData}>
      {currentStep === PAYMENT_STEP && (
        <PaymentMethodList methodRenderers={customRenderers} />
      )}
    </PaymentMethodFormManager>
  );
});

PaymentMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default PaymentMethodMemorized;

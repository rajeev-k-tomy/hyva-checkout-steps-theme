import React from 'react';

import BillingAddressForm from './components/BillingAddressForm';
import BillingAddressFormikProvider from './components/BillingAddressFormikProvider';
import { useStepContext } from '../step/hooks';
import { ADDRESS_STEP } from '../step/utility';
import { formikDataShape } from '../../../../utils/propTypes';

const BillingAddressMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();

  return (
    <BillingAddressFormikProvider formikData={formikData}>
      {currentStep === ADDRESS_STEP && <BillingAddressForm />}
    </BillingAddressFormikProvider>
  );
});

BillingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default BillingAddressMemorized;

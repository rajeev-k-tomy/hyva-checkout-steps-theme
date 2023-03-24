import React from 'react';

import ShippingAddressForm from './components/ShippingAddressForm';
import ShippingAddressList from './components/ShippingAddressList';
import ShippingAddressFormikProvider from './components/ShippingAddressFormikProvider';
import { useStepContext } from '../step/hooks';
import { ADDRESS_STEP } from '../step/utility';
import { formikDataShape } from '../../../../utils/propTypes';

const ShippingAddressMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();

  return (
    <ShippingAddressFormikProvider formikData={formikData}>
      {currentStep === ADDRESS_STEP && (
        <>
          <ShippingAddressList />
          <ShippingAddressForm />
        </>
      )}
    </ShippingAddressFormikProvider>
  );
});

ShippingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingAddressMemorized;

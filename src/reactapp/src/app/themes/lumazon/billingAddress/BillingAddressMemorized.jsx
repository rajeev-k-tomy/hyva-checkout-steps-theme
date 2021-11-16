import React from 'react';

import BillingAddressForm from './components/BillingAddressForm';
import BillingAddressFormikProvider from './components/BillingAddressFormikProvider';
import { formikDataShape } from '../../../../utils/propTypes';

const BillingAddressMemorized = React.memo(({ formikData }) => (
  <BillingAddressFormikProvider formikData={formikData}>
    <BillingAddressForm />
  </BillingAddressFormikProvider>
));

BillingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default BillingAddressMemorized;

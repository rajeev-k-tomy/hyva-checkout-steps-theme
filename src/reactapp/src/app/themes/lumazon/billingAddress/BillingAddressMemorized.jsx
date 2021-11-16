import React from 'react';

// import BillingAddressList from './components/BillingAddressList';
import BillingAddressFormikProvider from './components/BillingAddressFormikProvider';
import { formikDataShape } from '../../../utils/propTypes';
import BillingAddressForm from './components/BillingAddressForm';

const BillingAddressMemorized = React.memo(({ formikData }) => (
  <BillingAddressFormikProvider formikData={formikData}>
    <BillingAddressForm />
  </BillingAddressFormikProvider>
));

BillingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default BillingAddressMemorized;

import React from 'react';

import ShippingAddressForm from './components/ShippingAddressForm';
import ShippingAddressList from './components/ShippingAddressList';
import ShippingAddressFormikProvider from './components/ShippingAddressFormikProvider';
import { formikDataShape } from '../../../../utils/propTypes';

const ShippingAddressMemorized = React.memo(({ formikData }) => (
  <ShippingAddressFormikProvider formikData={formikData}>
    <ShippingAddressList />
    <ShippingAddressForm />
  </ShippingAddressFormikProvider>
));

ShippingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingAddressMemorized;

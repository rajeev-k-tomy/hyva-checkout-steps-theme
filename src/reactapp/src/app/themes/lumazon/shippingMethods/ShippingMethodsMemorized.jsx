import React from 'react';

import ShippingMethodList from './components/ShippingMethodList';
import { ShippingMethodFormManager } from '../../../code/shippingMethod/components';
import { formikDataShape } from '../../../../utils/propTypes';

const ShippingMethodsMemorized = React.memo(({ formikData }) => (
  <ShippingMethodFormManager formikData={formikData}>
    <ShippingMethodList />
  </ShippingMethodFormManager>
));

ShippingMethodsMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingMethodsMemorized;

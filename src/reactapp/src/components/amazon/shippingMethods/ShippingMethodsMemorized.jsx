import React from 'react';

import { formikDataShape } from '../../../utils/propTypes';
import ShippingMethodList from './components/ShippingMethodList';
import ShippingMethodFormManager from '../../shippingMethod/components/ShippingMethodFormManager';

const ShippingMethodsMemorized = React.memo(({ formikData }) => (
  <ShippingMethodFormManager formikData={formikData}>
    <ShippingMethodList />
  </ShippingMethodFormManager>
));

ShippingMethodsMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingMethodsMemorized;

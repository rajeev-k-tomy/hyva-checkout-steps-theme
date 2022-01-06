import React from 'react';

import PaymentMethodList from './components/PaymentMethodList';
import { PaymentMethodFormManager } from '../../../code/paymentMethod/components';
import { formikDataShape } from '../../../../utils/propTypes';
import customRenderers from '../../../../paymentMethods/customRenderers';

const PaymentMethodMemorized = React.memo(({ formikData }) => (
  <PaymentMethodFormManager formikData={formikData}>
    <PaymentMethodList methodRenderers={customRenderers} />
  </PaymentMethodFormManager>
));

PaymentMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default PaymentMethodMemorized;

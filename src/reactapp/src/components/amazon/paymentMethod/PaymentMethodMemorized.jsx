import React, { useEffect, useState } from 'react';

import PaymentMethodList from './components/PaymentMethodList';
import { PaymentMethodFormManager } from '../../paymentMethod';
import { formikDataShape } from '../../../utils/propTypes';
import getCustomRenderers from '../../../paymentMethods/customRenderers';

const PaymentMethodMemorized = React.memo(({ formikData }) => {
  const [renderers, setRenderers] = useState({});

  // collect custom renderers from the custom payment methods installed.
  useEffect(() => {
    (async () => {
      const availableRenderers = await getCustomRenderers();
      setRenderers(availableRenderers);
    })();
  }, []);

  return (
    <PaymentMethodFormManager formikData={formikData}>
      <PaymentMethodList methodRenderers={renderers} />
    </PaymentMethodFormManager>
  );
});

PaymentMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default PaymentMethodMemorized;

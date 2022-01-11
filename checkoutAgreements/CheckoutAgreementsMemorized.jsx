import React from 'react';

import CheckoutAgreementsForm from './components/CheckoutAgreementsForm';
import CheckoutAgreementModalWrapper from './components/CheckoutAgreementModalWrapper';
import CheckoutAgreementFormikProvider from './components/CheckoutAgreementsFormikProvider';
import { _isObjEmpty } from '../../../../utils';
import { formikDataShape } from '../../../../utils/propTypes';
import { useAgreementAppContext } from '../../../code/checkoutAgreements/hooks';

const CheckoutAgreementsMemorized = React.memo(({ formikData }) => {
  const { checkoutAgreements } = useAgreementAppContext();

  return (
    <CheckoutAgreementFormikProvider formikData={formikData}>
      {_isObjEmpty(checkoutAgreements) ? <></> : (
        <CheckoutAgreementModalWrapper>
          <div className="box-content px-6 py-3 mt-6 bg-gray-200 rounded-md shadow-sm">
            <CheckoutAgreementsForm />
          </div>
        </CheckoutAgreementModalWrapper>
      )}
    </CheckoutAgreementFormikProvider>
  );
});

CheckoutAgreementsMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CheckoutAgreementsMemorized;

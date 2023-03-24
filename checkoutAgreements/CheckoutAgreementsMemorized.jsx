import React from 'react';

import CheckoutAgreementsForm from './components/CheckoutAgreementsForm';
import CheckoutAgreementModalWrapper from './components/CheckoutAgreementModalWrapper';
import CheckoutAgreementFormikProvider from './components/CheckoutAgreementsFormikProvider';
import { LOGIN_STEP } from '../step/utility';
import { useStepContext } from '../step/hooks';
import { _isObjEmpty } from '../../../../utils';
import { formikDataShape } from '../../../../utils/propTypes';
import { useAgreementAppContext } from '../../../code/checkoutAgreements/hooks';

const CheckoutAgreementsMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();
  const { checkoutAgreements } = useAgreementAppContext();

  return (
    <CheckoutAgreementFormikProvider formikData={formikData}>
      {_isObjEmpty(checkoutAgreements) || currentStep !== LOGIN_STEP ? null : (
        <CheckoutAgreementModalWrapper>
          <div className="mt-6">
            <div className="flex items-center justify-center ">
              <div className="box-content w-5/6 px-6 py-3 bg-gray-200 rounded-md shadow-sm">
                <CheckoutAgreementsForm />
              </div>
            </div>
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

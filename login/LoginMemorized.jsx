import React from 'react';

import SignInForm from './components/SignInForm';
import Message from '../../../code/common/Message';
import PageLoader from '../../../code/common/Loader';
import LoginHeaderTabs from './components/LoginHeaderTabs';
import LoginFormManager from './components/LoginFormManager';
import CreateAccountForm from './components/CreateAccountForm';
import GuestContinueForm from './components/GuestContinueForm';
import CheckoutAgreements from '../../base/checkoutAgreements';

import { useLoginAppContext } from './hooks';
import { LOGIN_STEP } from '../step/utility';
import { useStepContext } from '../step/hooks';
import { formikDataShape } from '../../../../utils/propTypes';

const LoginMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();
  const { pageLoader } = useLoginAppContext();

  return (
    <LoginFormManager formikData={formikData}>
      {currentStep === LOGIN_STEP ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div style={{ width: 350 }}>
              <div>
                <LoginHeaderTabs />
                <div className="flex items-center h-full px-4 py-8 bg-white border border-t-0 rounded-b-lg shadow-md justify-items-center">
                  <div className="w-full">
                    <Message />
                    <CreateAccountForm />
                    <GuestContinueForm />
                    <SignInForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CheckoutAgreements />
          {pageLoader && <PageLoader />}
        </div>
      ) : (
        <CheckoutAgreements />
      )}
    </LoginFormManager>
  );
});

LoginMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default LoginMemorized;

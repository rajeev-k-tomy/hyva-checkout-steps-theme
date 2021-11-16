import React from 'react';

import SignInForm from './components/SignInForm';
import Message from '../../../code/common/Message';
import LoginHeaderTabs from './components/LoginHeaderTabs';
import LoginFormManager from './components/LoginFormManager';
import CreateAccountForm from './components/CreateAccountForm';
import GuestContinueForm from './components/GuestContinueForm';
import { formikDataShape } from '../../../../utils/propTypes';

const LoginMemorized = React.memo(({ formikData }) => (
  <LoginFormManager formikData={formikData}>
    <div className="flex items-center justify-center h-screen">
      <div className="" style={{ width: 350 }}>
        <div className="">
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
  </LoginFormManager>
));

LoginMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default LoginMemorized;

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { TextInput } from '../common/form';
import Button from '../../common/Button/Button';
import EmailField from './components/EmailField';
import ContinueButton from '../common/ContinueButton';
import LoginHeaderTabs from './components/LoginHeaderTabs';
import CreateAccountForm from './components/CreateAccountForm';
import {
  loginSections,
  isSignInSection,
  isNewCustomerSection,
} from './utility';

function Login() {
  const [activeSection, setActiveSection] = useState('guest');
  const [createAccount, setCreateAccount] = useState(false);

  const sections = loginSections(createAccount);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="" style={{ width: 350 }}>
        <div className="">
          <LoginHeaderTabs
            tabs={sections}
            currentTab={activeSection}
            actions={{ setActiveSection }}
          />
          <div className="flex items-center h-full px-4 py-8 bg-white border border-t-0 rounded-b-lg shadow-md justify-items-center">
            {isNewCustomerSection(activeSection) && (
              <div className="w-full space-y-4">
                {!createAccount && (
                  <>
                    <EmailField />
                    <ContinueButton />
                  </>
                )}
                <CreateAccountForm
                  isActive={createAccount}
                  actions={{ setCreateAccount }}
                />
              </div>
            )}

            {isSignInSection(activeSection) && (
              <div className="w-full space-y-4">
                <EmailField />
                <TextInput
                  type="password"
                  label="Password"
                  name="login.password"
                />

                <div className="flex items-center justify-center">
                  <Button variant="primary">Login</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

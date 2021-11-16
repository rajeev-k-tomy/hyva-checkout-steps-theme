import React from 'react';

import EmailField from './EmailField';
import { TextInput } from '../../common/form';
import { ContinueButton } from '../../common';
import {
  useLoginAppContext,
  useLoginFormContext,
  useLoginCartContext,
} from '../hooks';
import { __ } from '../../../../i18n';
import { isSignInSection } from '../utility';
import { passwordFieldName } from '../utility/field';

function SignInForm() {
  const { getCustomerCartInfo } = useLoginCartContext();
  const { formikData, loginFormValues, activeSection, isFormSectionValid } =
    useLoginFormContext();
  const { setMessage, setPageLoader, ajaxLogin, setErrorMessage } =
    useLoginAppContext();

  const handleLogin = async () => {
    setMessage(false);

    if (!isFormSectionValid) {
      return;
    }

    const { email, password } = loginFormValues;

    try {
      setPageLoader(true);

      const loginData = await ajaxLogin({ username: email, password });

      if (loginData.errors) {
        setErrorMessage(__(loginData.message || 'Login failed.'));
        setPageLoader(false);
        return;
      }

      await getCustomerCartInfo();
      setPageLoader(false);
    } catch (error) {
      setPageLoader(false);
      console.error(error);
    }
  };

  if (!isSignInSection(activeSection)) {
    return <></>;
  }

  return (
    <div className="w-full space-y-4">
      <EmailField />
      <TextInput
        type="password"
        label="Password"
        formikData={formikData}
        name={passwordFieldName}
      />

      <div className="flex items-center justify-center">
        <ContinueButton
          label="Login"
          variant="primary"
          actions={{ submit: handleLogin }}
        />
      </div>
    </div>
  );
}

export default SignInForm;

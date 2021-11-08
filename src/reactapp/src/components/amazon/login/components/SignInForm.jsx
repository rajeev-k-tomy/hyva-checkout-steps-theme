import React from 'react';

import EmailField from './EmailField';
import Button from '../../../common/Button';
import { TextInput } from '../../common/form';
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
        name={passwordFieldName}
        formikData={formikData}
      />

      <div className="flex items-center justify-center">
        <Button click={handleLogin} variant="primary">
          Login
        </Button>
      </div>
    </div>
  );
}

export default SignInForm;

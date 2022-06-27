import React from 'react';

import EmailField from './EmailField';
import { TextInput } from '../../common/form';
import { ContinueButton } from '../../common';
import {
  useLoginAppContext,
  useLoginFormContext,
  useLoginCartContext,
} from '../hooks';
import { __ } from '../../../../../i18n';
import { isSignInSection } from '../utility';
import { passwordFieldName } from '../utility/field';
import { useFormikStateFiller } from '../../checkoutForm/hooks';
import { aggregatedQueryRequest } from '../../../../../api';

function SignInForm() {
  const { storeAggregatedCartStates } = useLoginCartContext();
  const { fillFormikStates } = useFormikStateFiller();
  const { formikData, loginFormValues, activeSection, isFormSectionValid } =
    useLoginFormContext();
  const {
    ajaxLogin,
    setMessage,
    appDispatch,
    setPageLoader,
    setErrorMessage,
    storeAggregatedAppStates,
  } = useLoginAppContext();

  const handleLogin = async () => {
    setMessage(false);

    if (!isFormSectionValid) {
      return false;
    }

    const { email, password } = loginFormValues;

    try {
      setPageLoader(true);
      const noReload = true;
      const loginData = await ajaxLogin(
        { username: email, password },
        noReload
      );

      if (loginData.errors) {
        setErrorMessage(__(loginData.message || 'Login failed.'));
        setPageLoader(false);
        return false;
      }

      const data = await aggregatedQueryRequest(appDispatch);

      await storeAggregatedCartStates(data);
      await storeAggregatedAppStates(data);
      fillFormikStates(data);
      return true;
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoader(false);
    }
    return false;
  };

  if (!isSignInSection(activeSection)) {
    return null;
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

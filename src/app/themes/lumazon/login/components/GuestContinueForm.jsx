import React from 'react';

import EmailField from './EmailField';
import CreateAccountButton from './CreateAccountButton';
import ContinueButton from '../../common/ContinueButton';
import { isNewCustomerSection } from '../utility';
import {
  useLoginAppContext,
  useLoginCartContext,
  useLoginFormContext,
} from '../hooks';

function GuestContinueForm() {
  const { setEmailOnGuestCart } = useLoginCartContext();
  const { setPageLoader } = useLoginAppContext();
  const { loginFormValues, isFormSectionValid, activeSection, createAccount } =
    useLoginFormContext();

  if (!isNewCustomerSection(activeSection) || createAccount) {
    return <></>;
  }

  const saveGuestEmailAddress = async () => {
    try {
      if (!isFormSectionValid) {
        return false;
      }
      setPageLoader(true);
      await setEmailOnGuestCart(loginFormValues.email);
      setPageLoader(false);
      return true;
    } catch (error) {
      console.log({ error });
      setPageLoader(false);
      return false;
    }
  };

  if (!isNewCustomerSection(activeSection)) {
    return <></>;
  }

  return (
    <div className="w-full space-y-4">
      <EmailField />
      <ContinueButton actions={{ submit: saveGuestEmailAddress }} />
      <CreateAccountButton />
    </div>
  );
}

export default GuestContinueForm;

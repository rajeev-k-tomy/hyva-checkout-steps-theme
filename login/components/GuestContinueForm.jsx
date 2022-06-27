import React from 'react';

import EmailField from './EmailField';
import CreateAccountButton from './CreateAccountButton';
import ContinueButton from '../../common/ContinueButton';
import {
  useLoginAppContext,
  useLoginCartContext,
  useLoginFormContext,
} from '../hooks';
import { isNewCustomerSection } from '../utility';

function GuestContinueForm() {
  const { setPageLoader, setMessage } = useLoginAppContext();
  const { cartEmail, setEmailOnGuestCart } = useLoginCartContext();
  const { formSectionErrors, loginFormValues, activeSection, createAccount } =
    useLoginFormContext();

  const saveGuestEmailAddress = async () => {
    setMessage(false);
    const emailToSave = loginFormValues.email;

    if (formSectionErrors || cartEmail === emailToSave) {
      return true;
    }

    try {
      setPageLoader(true);
      await setEmailOnGuestCart(emailToSave);
      setPageLoader(false);
      return true;
    } catch (error) {
      console.error({ error });
      setPageLoader(false);
      return false;
    }
  };

  if (!isNewCustomerSection(activeSection) || createAccount) {
    return null;
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

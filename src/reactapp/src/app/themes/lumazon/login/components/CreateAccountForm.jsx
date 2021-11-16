import React from 'react';
import { UserRemoveIcon } from '@heroicons/react/solid';

import EmailField from './EmailField';
import { TextInput } from '../../common/form';
import Button from '../../../common/Button/Button';
import { HorizontalLineSeparator } from '../../common';
import { useLoginFormContext } from '../hooks';
import { isNewCustomerSection } from '../utility';

function CreateAccountForm() {
  const { activeSection, createAccount, setCreateAccount } =
    useLoginFormContext();

  if (!isNewCustomerSection(activeSection) || !createAccount) {
    return <></>;
  }

  return (
    <div className="w-full space-y-4">
      <TextInput name="login.fullName" label="Your name" />
      <EmailField />
      <TextInput
        type="password"
        label="Password"
        name="login.password"
        placeholder="At least 6 characters"
        helpText="Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."
      />
      <TextInput
        type="password"
        label="Password again"
        name="login.confirmPassword"
      />
      <div className="flex items-center justify-center">
        <Button variant="primary">Create Account</Button>
      </div>
      <div className="w-full space-y-4">
        <HorizontalLineSeparator word="OR" />
        <button
          type="button"
          className="flex items-center justify-center w-full pt-4 pr-6 space-x-2 text-sm cursor-pointer hover:text-blue-800"
          onClick={() => setCreateAccount(false)}
        >
          <UserRemoveIcon className="w-6 h-6" />
          <span className="hover:underline">Continue as guest</span>
        </button>
      </div>
    </div>
  );
}

export default CreateAccountForm;

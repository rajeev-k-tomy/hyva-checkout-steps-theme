import React from 'react';
import { bool, func, shape } from 'prop-types';
import { PlusSmIcon, UserRemoveIcon } from '@heroicons/react/solid';

import EmailField from './EmailField';
import Button from '../../../common/Button/Button';
import TextInput from '../../common/form/TextInput';
import HorizontalLineSeparator from '../../common/HorizontalLineSeparator';
import useStepContext from '../../step/hooks/useStepContext';
import { ROUTE_PATH_CREATE_ACCOUNT } from '../../step/utility';

function CreateAccountForm({ isActive, actions }) {
  const { setStepRoutePath } = useStepContext();
  if (!isActive) {
    return (
      <div className="space-y-4">
        <HorizontalLineSeparator word="OR" />
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="flex items-center justify-center pt-4 pr-6 text-sm cursor-pointer hover:text-blue-800"
            onClick={() => {
              actions.setCreateAccount(true);
              setStepRoutePath(ROUTE_PATH_CREATE_ACCOUNT);
            }}
          >
            <PlusSmIcon className="w-6 h-6" />
            <span className="hover:underline">Create you Site account</span>
          </button>
        </div>
      </div>
    );
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
        {/* <div className="flex items-center justify-center">
          <Button
            variant="warning"
            size="sm"
            click={() => actions.setCreateAccount(false)}
          >
            Continue as guest
          </Button>
        </div> */}
        <button
          type="button"
          className="flex items-center justify-center w-full pt-4 pr-6 space-x-2 text-sm cursor-pointer hover:text-blue-800"
          onClick={() => actions.setCreateAccount(false)}
        >
          <UserRemoveIcon className="w-6 h-6" />
          <span className="hover:underline">Continue as guest</span>
        </button>
      </div>
    </div>
  );
}

CreateAccountForm.propTypes = {
  isActive: bool.isRequired,
  actions: shape({ setCreateAccount: func }).isRequired,
};

export default CreateAccountForm;

import React from 'react';

import EmailField from './EmailField';
import Button from '../../../common/Button';
import { TextInput } from '../../common/form';
import { useLoginFormContext } from '../hooks';
import { isSignInSection } from '../utility';

function SignInForm() {
  const { activeSection } = useLoginFormContext();

  if (!isSignInSection(activeSection)) {
    return <></>;
  }

  return (
    <div className="w-full space-y-4">
      <EmailField />
      <TextInput type="password" label="Password" name="login.password" />

      <div className="flex items-center justify-center">
        <Button variant="primary">Login</Button>
      </div>
    </div>
  );
}

export default SignInForm;

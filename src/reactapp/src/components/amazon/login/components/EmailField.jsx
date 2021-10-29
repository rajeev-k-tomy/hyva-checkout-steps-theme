/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { MailIcon } from '@heroicons/react/solid';
import { TextInput } from '../../common/form';

function EmailField() {
  const leftIcon = (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
  );

  return (
    <TextInput
      name="login.email"
      leftIcon={leftIcon}
      label="Email"
      type="email"
      placeholder="you@example.com"
    />
  );
}

export default EmailField;

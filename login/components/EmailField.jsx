import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

import { TextInput } from '../../common/form';
import { useLoginFormContext } from '../hooks';
import { classNames } from '../../../../../utils';
import { emailFieldName } from '../utility/field';
import { __ } from '../../../../../i18n';

function EmailField() {
  const { formikData, formSectionErrors, formSectionTouched } =
    useLoginFormContext();
  const hasFieldError = !!formSectionErrors?.email;
  const hasFieldTouched = !!formSectionTouched?.email;
  const isEmailError = hasFieldError && hasFieldTouched;

  const leftIcon = (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <EnvelopeIcon
        className={classNames(
          isEmailError ? 'text-red-400' : 'text-gray-400',
          'w-5 h-5 '
        )}
        aria-hidden="true"
      />
    </div>
  );

  return (
    <TextInput
      type="email"
      label={__('Email')}
      leftIcon={leftIcon}
      name={emailFieldName}
      formikData={formikData}
      placeholder={__('you@example.com')}
    />
  );
}

export default EmailField;

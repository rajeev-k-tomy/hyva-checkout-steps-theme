import React from 'react';
import { PlusSmallIcon } from '@heroicons/react/24/solid';

import { HorizontalLineSeparator } from '../../common';
import { __ } from '../../../../../i18n';
import { useLoginFormContext } from '../hooks';
import useStepContext from '../../step/hooks/useStepContext';
import { ROUTE_PATH_CREATE_ACCOUNT } from '../../step/utility';

function CreateAccountButton() {
  const { setStepRoutePath } = useStepContext();
  const { setCreateAccount } = useLoginFormContext();

  return (
    <div className="space-y-4">
      <HorizontalLineSeparator word={__('OR')} />
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex items-center justify-center pt-4 pr-6 text-sm cursor-pointer hover:text-blue-800"
          onClick={() => {
            setCreateAccount(true);
            setStepRoutePath(ROUTE_PATH_CREATE_ACCOUNT);
          }}
        >
          <PlusSmallIcon className="w-6 h-6" />
          <span className="hover:underline">{__('Create an account')}</span>
        </button>
      </div>
    </div>
  );
}

export default CreateAccountButton;

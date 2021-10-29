import { PlusSmIcon } from '@heroicons/react/solid';
import React from 'react';
import BillingAddress from './BillingAddress';
import { OtherAddressList } from '../address';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';
import { GeneralSection, SubSection } from '../common/sections';

function BillingAddressList() {
  return (
    <GeneralSection
      title="Select a billing address"
      addTopPadding
      titleRightContent={
        <div className="flex items-center justify-center pr-6 cursor-pointer hover:text-blue-800">
          <PlusSmIcon className="w-8 h-8" />
          <span className="hover:underline">Add new address</span>
        </div>
      }
    >
      <SubSection title="Available billing addresses">
        <OtherAddressList />
      </SubSection>

      <BillingAddress />

      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default BillingAddressList;

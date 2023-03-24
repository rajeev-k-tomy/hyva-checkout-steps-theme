import React from 'react';

import { TextInput } from '../common/form';
import Button from '../../../code/common/Button';
import { GeneralSection, SubSection } from '../common/sections';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';
import { __ } from '../../../../i18n';

function Discount() {
  return (
    <GeneralSection title={__('More payment options')} addTopPadding>
      <SubSection title={__('Apply promotional codes')}>
        <div className="flex items-start space-x-4">
          <TextInput
            name="discount_code"
            label={__('Enter your promotional code')}
            placeholder={__('Enter your promotional code')}
          />
          <div className="mt-6">
            <Button size="sm">{__('Apply')}</Button>
          </div>
        </div>
      </SubSection>
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default Discount;

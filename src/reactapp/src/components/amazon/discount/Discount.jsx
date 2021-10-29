import React from 'react';
import Button from '../../common/Button/Button';
import { TextInput } from '../common/form';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';
import { GeneralSection, SubSection } from '../common/sections';

function Discount() {
  return (
    <GeneralSection title="More payment options" addTopPadding>
      <SubSection title="Apply promotional codes">
        <div className="flex items-start space-x-4">
          <TextInput
            label="Enter your promotional code"
            name="discount_code"
            placeholder="Enter code"
          />
          <div className="mt-6">
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </SubSection>
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default Discount;

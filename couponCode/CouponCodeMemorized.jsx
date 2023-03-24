import React from 'react';

import { HorizontalLineSeparator } from '../common';
import CouponCodeForm from './components/CouponCodeForm';
import { GeneralSection, SubSection } from '../common/sections';
import CouponCodeFormikManager from './components/CouponCodeFormikManager';
import { __ } from '../../../../i18n';
import { useStepContext } from '../step/hooks';
import { PAYMENT_STEP } from '../step/utility';
import { formikDataShape } from '../../../../utils/propTypes';

const CouponCodeMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();

  return (
    <CouponCodeFormikManager formikData={formikData}>
      {currentStep === PAYMENT_STEP && (
        <GeneralSection title={__('More payment options')} addTopPadding>
          <SubSection title={__('Apply promotional codes')}>
            <CouponCodeForm />
          </SubSection>
          <HorizontalLineSeparator />
        </GeneralSection>
      )}
    </CouponCodeFormikManager>
  );
});

CouponCodeMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CouponCodeMemorized;

import React from 'react';

import { HorizontalLineSeparator } from '../common';
import CouponCodeForm from './components/CouponCodeForm';
import { GeneralSection, SubSection } from '../common/sections';
import CouponCodeFormikManager from './components/CouponCodeFormikManager';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';

const CouponCodeMemorized = React.memo(({ formikData }) => (
  <CouponCodeFormikManager formikData={formikData}>
    <GeneralSection title={__('More payment options')} addTopPadding>
      <SubSection title={__('Apply promotional codes')}>
        <CouponCodeForm />
      </SubSection>
      <HorizontalLineSeparator />
    </GeneralSection>
  </CouponCodeFormikManager>
));

CouponCodeMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CouponCodeMemorized;

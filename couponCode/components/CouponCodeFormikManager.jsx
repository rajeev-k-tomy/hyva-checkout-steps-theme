import React, { useMemo } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { string as YupString } from 'yup';

import { CouponCodeFormikContext } from '../context';
import { useFormSection } from '../../../../../hooks';
import { COUPON_CODE_FORM } from '../../../../../config';
import { formikDataShape } from '../../../../../utils/propTypes';
import { couponCodeInitialValues } from '../../step/utility/initialValues';

const validationSchema = {
  code: YupString().nullable(),
};

function CouponCodeFormikManager({ children, formikData }) {
  const formSubmit = () => {};

  const formContext = useFormSection({
    formikData,
    initialValues: couponCodeInitialValues,
    validationSchema,
    id: COUPON_CODE_FORM,
    submitHandler: formSubmit,
  });

  const context = useMemo(
    () => ({ ...formContext, ...formikData, formikData }),
    [formContext, formikData]
  );

  return (
    <CouponCodeFormikContext.Provider value={context}>
      <Form id={COUPON_CODE_FORM}>{children}</Form>
    </CouponCodeFormikContext.Provider>
  );
}

CouponCodeFormikManager.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default CouponCodeFormikManager;

import React, { useEffect, useState } from 'react';

import { TextInput } from '../../common/form';
import Button from '../../../../code/common/Button';
import {
  useCouponCodeAppContext,
  useCouponCodeFormContext,
  useCouponCodeCartContext,
} from '../hooks';
import { __ } from '../../../../../i18n';

function CouponCodeForm() {
  const [codeChecked, setCodeChecked] = useState('');
  const { fields, formikData, setFieldError, setFieldTouched, setFieldValue } =
    useCouponCodeFormContext();
  const { setPageLoader, setSuccessMessage, setErrorMessage } =
    useCouponCodeAppContext();
  const { appliedCoupon, applyCouponCode, removeCouponCode } =
    useCouponCodeCartContext();
  const couponCode = formikData?.formSectionValues?.couponCode;

  const handleApplyCoupon = async (code) => {
    try {
      setPageLoader(true);
      await applyCouponCode(code);
      setCodeChecked(code);
      setSuccessMessage(
        __('Coupon code: %1 is applied successfully.', couponCode)
      );
      setPageLoader(false);
    } catch (error) {
      console.error(error);
      setCodeChecked(code);
      setErrorMessage(
        error?.message || __('Coupon code: %1 is invalid.', couponCode)
      );
      setPageLoader(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setPageLoader(true);
      await removeCouponCode();
      setFieldValue(fields.couponCode, '');
      setCodeChecked('');
      setSuccessMessage(
        __('Coupon code: %1 is removed successfully.', couponCode)
      );
      setPageLoader(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.message);
      setPageLoader(false);
    }
  };

  const submitHandler = async () => {
    if (!couponCode) {
      await setFieldTouched(fields.couponCode, true);
      await setFieldError(fields.couponCode, __('Required'));
      return;
    }

    if (appliedCoupon) {
      await handleRemoveCoupon();
    } else {
      await handleApplyCoupon(couponCode);
    }
  };

  useEffect(() => {
    if (appliedCoupon) {
      setCodeChecked(appliedCoupon);
    }
  }, [appliedCoupon]);

  return (
    <div className="flex items-start justify-center space-x-4">
      <TextInput
        formikData={formikData}
        name={fields.couponCode}
        disabled={!!appliedCoupon}
        placeholder={__('Enter your discount code')}
      />
      <div className="w-64">
        <Button
          size="sm"
          click={submitHandler}
          variant={appliedCoupon ? 'warning' : 'primary'}
          disable={appliedCoupon ? false : codeChecked === couponCode}
        >
          {appliedCoupon ? __('Remove Coupon Code') : __('Apply Discount')}
        </Button>
      </div>
    </div>
  );
}

export default CouponCodeForm;

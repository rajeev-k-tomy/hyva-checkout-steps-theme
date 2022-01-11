import React from 'react';

import Login from './login';
import { Step } from './step';
import CouponCode from './couponCode';
import StepProvider from './step/StepProvider';
import { PaymentMethod } from './paymentMethod';
import { BillingAddress } from './billingAddress';
import { ShippingAddress } from './shippingAddress';
import { ShippingMethods } from './shippingMethods';
import { MainContentSection } from './common/sections';
import CheckoutAgreements from './checkoutAgreements';

function CheckoutForm() {
  return (
    <StepProvider>
      <Step id={1}>
        <div className="flex flex-col items-center justify-center h-screen">
          <Login />
          <CheckoutAgreements />
        </div>
      </Step>
      <Step id={2}>
        <MainContentSection>
          <ShippingAddress />
          <BillingAddress />
        </MainContentSection>
      </Step>
      <Step id={3}>
        <MainContentSection>
          <ShippingMethods />
        </MainContentSection>
      </Step>
      <Step id={4}>
        <MainContentSection>
          <PaymentMethod />
          <CouponCode />
        </MainContentSection>
      </Step>
    </StepProvider>
  );
}

export default CheckoutForm;

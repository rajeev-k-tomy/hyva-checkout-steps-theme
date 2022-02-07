import React from 'react';

import Login from './login';
import { Step } from './step';
import CouponCode from './couponCode';
import { AddressWrapper } from './address';
import StepProvider from './step/StepProvider';
import { PaymentMethod } from './paymentMethod';
import { BillingAddress } from './billingAddress';
import StepsContainer from './step/StepsContainer';
import { ShippingAddress } from './shippingAddress';
import { ShippingMethods } from './shippingMethods';
import CheckoutAgreements from './checkoutAgreements';
import { MainContentSection } from './common/sections';

function CheckoutForm() {
  return (
    <StepProvider>
      <StepsContainer>
        <Step id={1}>
          <div className="flex flex-col items-center justify-center h-screen">
            <Login />
            <CheckoutAgreements />
          </div>
        </Step>
        <Step id={2}>
          <MainContentSection>
            <AddressWrapper>
              <ShippingAddress />
              <BillingAddress />
            </AddressWrapper>
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
      </StepsContainer>
    </StepProvider>
  );
}

export default CheckoutForm;

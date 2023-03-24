import React from 'react';

import Login from './login';
import CouponCode from './couponCode';
import { AddressWrapper } from './address';
import StepProvider from './step/StepProvider';
import { PaymentMethod } from './paymentMethod';
import { BillingAddress } from './billingAddress';
import StepsContainer from './step/StepsContainer';
import { ShippingAddress } from './shippingAddress';
import { ShippingMethods } from './shippingMethods';
import { MainContentSection } from './common/sections';

function CheckoutForm() {
  return (
    <StepProvider>
      <StepsContainer>
        <Login />
        <MainContentSection>
          <AddressWrapper>
            <ShippingAddress />
            <BillingAddress />
          </AddressWrapper>
          <ShippingMethods />
          <PaymentMethod />
          <CouponCode />
        </MainContentSection>
      </StepsContainer>
    </StepProvider>
  );
}

export default CheckoutForm;

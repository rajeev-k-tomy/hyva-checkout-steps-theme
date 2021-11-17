import React from 'react';

import Login from './login';
import { Step } from './step';
// import Discount from './discount/Discount';
import StepProvider from './step/StepProvider';
import { PaymentMethod } from './paymentMethod';
import { BillingAddress } from './billingAddress';
import { ShippingAddress } from './shippingAddress';
import { ShippingMethods } from './shippingMethods';
import { MainContentSection } from './common/sections';

function CheckoutForm() {
  return (
    <StepProvider>
      <Step id={1}>
        <Login />
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
          {/* <Discount /> */}
        </MainContentSection>
      </Step>
    </StepProvider>
  );
}

export default CheckoutForm;

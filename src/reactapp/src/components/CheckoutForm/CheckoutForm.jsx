import React, { useEffect, useState } from 'react';

import Login from '../amazon/login';
import { Step } from '../amazon/step';
// import Discount from '../amazon/discount/Discount';
import StepProvider from '../amazon/step/StepProvider';
import CheckoutFormWrapper from './CheckoutFormWrapper';
import { PaymentMethod } from '../amazon/paymentMethod';
import { BillingAddress } from '../amazon/billingAddress';
import { ShippingAddress } from '../amazon/shippingAddress';
// import { ShippingMethods } from '../amazon/shippingMethods';
import { MainContentSection } from '../amazon/common/sections';
import { config } from '../../config';
import { aggregatedQueryRequest } from '../../api';
import useCheckoutFormAppContext from './hooks/useCheckoutFormAppContext';
import useCheckoutFormCartContext from './hooks/useCheckoutFormCartContext';

function CheckoutForm() {
  const [initialData, setInitialData] = useState(false);
  const { orderId, storeAggregatedCartStates } = useCheckoutFormCartContext();
  const { appDispatch, setPageLoader, storeAggregatedAppStates } =
    useCheckoutFormAppContext();

  /**
   * Collect App, Cart data when the page loads.
   */
  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const data = await aggregatedQueryRequest(appDispatch);
        await storeAggregatedCartStates(data);
        await storeAggregatedAppStates(data);
        setInitialData(data);
        setPageLoader(false);
      } catch (error) {
        setPageLoader(false);
      }
    })();
  }, [
    appDispatch,
    setPageLoader,
    storeAggregatedAppStates,
    storeAggregatedCartStates,
  ]);

  if (orderId && config.isDevelopmentMode) {
    return (
      <div className="flex flex-col items-center justify-center mx-10 my-10">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="flex flex-col items-center justify-center mt-4 space-y-3">
          <div>Your order is placed.</div>
          <div>{`Order Number: #${orderId}`}</div>
        </div>
      </div>
    );
  }

  return (
    <CheckoutFormWrapper initialData={initialData}>
      <StepProvider>
        <Step id={1}>
          <Login />
        </Step>
        <Step id={2}>
          <MainContentSection>
            <ShippingAddress />
            {/* <ShippingMethods /> */}
            <BillingAddress />
          </MainContentSection>
        </Step>
        <Step id={3}>
          <MainContentSection>
            <PaymentMethod />
            {/* <BillingAddress /> */}
            {/* <Discount /> */}
          </MainContentSection>
        </Step>
      </StepProvider>
    </CheckoutFormWrapper>
  );
}

export default CheckoutForm;

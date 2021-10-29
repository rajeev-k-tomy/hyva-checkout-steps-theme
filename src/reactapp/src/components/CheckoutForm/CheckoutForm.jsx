import React, { useEffect, useState } from 'react';

import Login from '../amazon/login';
import { Step } from '../amazon/step';
import StepProvider from '../amazon/step/StepProvider';
import CheckoutFormWrapper from './CheckoutFormWrapper';
import { ShippingAddress } from '../amazon/shippingAddress';
import { PaymentMethodList } from '../amazon/paymentMethod';
import AddressList from '../amazon/shippingAddress/AddressList';
import ShippingMethodList from '../amazon/shippingMethod/ShippingMethodList';
import MainContentSection from '../amazon/common/sections/MainContentSection';
import { BillingAddressList } from '../amazon/billingAddress';
import { config } from '../../config';
import { aggregatedQueryRequest } from '../../api';
import useCheckoutFormAppContext from './hooks/useCheckoutFormAppContext';
import useCheckoutFormCartContext from './hooks/useCheckoutFormCartContext';
import Discount from '../amazon/discount/Discount';

function CheckoutForm() {
  const [initialData, setInitialData] = useState(false);
  const { appDispatch, setPageLoader, storeAggregatedAppStates } =
    useCheckoutFormAppContext();
  const { orderId, storeAggregatedCartStates } = useCheckoutFormCartContext();

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
            <AddressList />
            <ShippingAddress />
            <ShippingMethodList />
          </MainContentSection>
        </Step>
        <Step id={3}>
          <MainContentSection>
            <PaymentMethodList />
            <BillingAddressList />
            <Discount />
          </MainContentSection>
        </Step>
      </StepProvider>
    </CheckoutFormWrapper>
  );
}

export default CheckoutForm;

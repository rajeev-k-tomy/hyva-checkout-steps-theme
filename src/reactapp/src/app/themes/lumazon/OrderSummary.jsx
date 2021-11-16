import React from 'react';

import Totals from './Totals';
import { CartItemList } from './cartItems';
import ContinueButton from './common/ContinueButton';
import { PlaceOrder } from '../../code/placeOrder/components';
import useStepContext from './step/hooks/useStepContext';

function OrderSummary() {
  const { currentStep } = useStepContext();

  return (
    <div className="flex-1 ml-12 space-y-10">
      <div>
        <h1 className="text-xl font-bold">Order Summary</h1>
      </div>

      <div className="space-y-4 overflow-hidden bg-white shadow sm:rounded-md">
        <CartItemList />
        <Totals />
        <div className="py-8 border-t">
          {currentStep === 4 ? (
            <PlaceOrder />
          ) : (
            <ContinueButton variant="warning" size="lg" />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

import React from 'react';
import Button from '../common/Button/Button';
import CartItemList from './CartItemList';
import ContinueButton from './common/ContinueButton';
import useStepContext from './step/hooks/useStepContext';
import Totals from './Totals';

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
          {currentStep === 3 ? (
            <div className="flex items-center justify-center">
              <Button size="lg" click={() => {}}>
                Place order
              </Button>
            </div>
          ) : (
            <ContinueButton variant="warning" size="lg" />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

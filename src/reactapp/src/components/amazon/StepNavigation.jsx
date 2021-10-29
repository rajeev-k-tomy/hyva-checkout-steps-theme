import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid';

import useStepContext from './step/hooks/useStepContext';
import { classNames, _range } from '../../utils';
import {
  TOTAL_STEPS,
  ROUTE_PATH_PAYMENT,
  ROUTE_PATH_SHIPPING,
  ROUTE_PATH_NEW_CUSTOMER,
} from './step/utility';

const steps = _range(1, TOTAL_STEPS);

function StepNavigation() {
  const { currentStep } = useStepContext();

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/4">
        <div className="w-full pt-4">
          <div className="flex w-full pt-4">
            {steps.map((stepNumber) => {
              if (currentStep === stepNumber) {
                return (
                  <div
                    key={stepNumber}
                    className="px-1 -mb-3 text-sm text-blue-600"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                  </div>
                );
              }
              return (
                <div
                  key={stepNumber}
                  className={classNames(
                    stepNumber < currentStep ? 'border-primary-lighter' : '',
                    'flex-1 border-b'
                  )}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between w-full pt-3">
            <div className="text-sm font-semibold text-blue-600">
              <a href={ROUTE_PATH_NEW_CUSTOMER}>LOGIN</a>
            </div>
            <div
              className={classNames(
                currentStep >= 2 ? 'text-blue-600' : 'text-gray-300',
                'text-sm font-semibold'
              )}
            >
              <a href={ROUTE_PATH_SHIPPING}>SHIPPING</a>
            </div>
            <div
              className={classNames(
                currentStep === 3 ? 'text-blue-600' : 'text-gray-300',
                'text-sm font-semibold'
              )}
            >
              {currentStep === 3 ? (
                <a href={ROUTE_PATH_PAYMENT}>PAYMENT</a>
              ) : (
                <span>PAYMENT</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepNavigation;

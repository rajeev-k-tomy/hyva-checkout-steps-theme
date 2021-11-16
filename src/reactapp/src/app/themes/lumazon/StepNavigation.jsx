import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/solid';

import { classNames, _range } from '../../../utils';
import useStepContext from './step/hooks/useStepContext';
import { TOTAL_STEPS, stepTitles } from './step/utility';

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
            {stepTitles(currentStep).map((step) => (
              <div
                key={step.title}
                className={classNames(
                  step.active ? 'text-blue-600' : 'text-gray-300',
                  'text-sm font-semibold'
                )}
              >
                <a href={step.path}>{step.title}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepNavigation;

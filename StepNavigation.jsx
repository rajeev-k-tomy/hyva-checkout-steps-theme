/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

import { classNames, _range } from '../../../utils';
import useStepContext from './step/hooks/useStepContext';
import { TOTAL_STEPS, stepTitles, validateStep } from './step/utility';
import { useAppContext, useCheckoutFormContext } from '../../../hooks';

const steps = _range(1, TOTAL_STEPS);

function StepNavigation() {
  const { values } = useFormikContext();
  const { setErrorMessage } = useAppContext();
  const { formSections } = useCheckoutFormContext();
  const { currentStep, setStepRoutePath } = useStepContext();

  /**
   * Handle step navigation
   * Make sure you cannot be navigated to future steps if the data is not valid.
   */
  const handleStepNavigation = async (step, stepId) => {
    const { errors: hasErrors, message: errorMessage } = await validateStep(
      formSections,
      stepId,
      values
    );

    if (hasErrors) {
      setErrorMessage(errorMessage);
      return;
    }

    setStepRoutePath(step.path);
  };

  return (
    <>
      <div className="items-center justify-center hidden md:flex">
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
              {stepTitles(currentStep).map((step, index) => (
                <div
                  key={step.title}
                  className={classNames(
                    step.active ? 'text-blue-600' : 'text-gray-300',
                    'text-sm font-semibold cursor-pointer'
                  )}
                >
                  <a onClick={() => handleStepNavigation(step, index + 1)}>
                    {step.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8 md:hidden">
        <h1 className="text-2xl font-extrabold">
          {_get(
            stepTitles(currentStep)
              .filter((step) => step.active)
              .slice(-1),
            '0.mobileTitle'
          )}
        </h1>
      </div>
    </>
  );
}

export default StepNavigation;

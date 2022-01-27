import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';

import {
  initialStepId,
  pathStepRelation,
  defaultStepRoutePath,
} from './utility';
import StepContext from './context/StepContext';
import { useCheckoutFormContext } from '../../../../hooks';

function StepProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(initialStepId);
  const { setEnableReInitialize } = useCheckoutFormContext();

  const setStepRoutePath = useCallback((path) => {
    window.location.hash = path.replace('#', '');
  }, []);

  const goToNextStep = useCallback(
    (routePath) => {
      setStepRoutePath(routePath || defaultStepRoutePath[currentStep + 1]);
      setCurrentStep(currentStep + 1);
    },
    [setStepRoutePath, currentStep]
  );

  /**
   * Need to turn off re-initialize feature of formik which is ON by default.
   * In step approach, when we go from one step to another, this would reset
   * the formik sections into initial state, which we dont need.
   */
  useEffect(() => {
    setEnableReInitialize(false);
  }, [setEnableReInitialize]);

  /**
   * When we click on the back/forward button of the browser or basically whenever
   * the hash url part changes, we need to set the step accordingly.
   * "window.onhashchange" is an event fired in all such occasions and hence,
   * a perfect place to update the step accordingly.
   */
  useEffect(() => {
    window.onhashchange = (event) => {
      const { newURL } = event;
      const hashRoutePath = newURL.split('#')[1];
      const newStep = pathStepRelation[`#${hashRoutePath}`] || 1;
      setCurrentStep(newStep);
    };
  }, []);

  const context = useMemo(
    () => ({
      currentStep,
      goToNextStep,
      setCurrentStep,
      setStepRoutePath,
    }),
    [currentStep, goToNextStep, setStepRoutePath]
  );

  return (
    <StepContext.Provider value={context}>{children}</StepContext.Provider>
  );
}

StepProvider.propTypes = {
  children: node.isRequired,
};

export default StepProvider;

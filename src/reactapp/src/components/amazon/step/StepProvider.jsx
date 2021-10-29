import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';

import StepContext from './context/StepContext';
import {
  initialStepId,
  pathStepRelation,
  defaultStepRoutePath,
} from './utility';

function StepProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(initialStepId);

  const setStepRoutePath = (path) => {
    window.location.hash = path.replace('#', '');
  };

  const goToNextStep = (routePath) => {
    setStepRoutePath(routePath || defaultStepRoutePath[currentStep + 1]);
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    window.onhashchange = (event) => {
      const { newURL } = event;
      const hashRoutePath = newURL.split('#')[1];
      const newStep = pathStepRelation[`#${hashRoutePath}`] || 1;
      setCurrentStep(newStep);
    };
  }, []);

  return (
    <StepContext.Provider
      value={{ currentStep, setCurrentStep, goToNextStep, setStepRoutePath }}
    >
      {children}
    </StepContext.Provider>
  );
}

StepProvider.propTypes = {
  children: node.isRequired,
};

export default StepProvider;

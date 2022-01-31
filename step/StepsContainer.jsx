import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { useStepContext } from './hooks';
import { isFormPopulatedField } from '../checkoutAgreements/utility';

function StepsContainer({ children }) {
  const { currentStep } = useStepContext();
  const { setFieldValue } = useFormikContext();

  /**
   * Checkout agreement validation and values needs to be populated again
   * when user come back to step 1. Need a wrapper container such as this needed
   * in order to make sure the side effect works whenever step is switched.
   */
  useEffect(() => {
    if (currentStep !== 1) {
      setFieldValue(isFormPopulatedField, false);
    }
  }, [currentStep, setFieldValue]);

  return children;
}

export default StepsContainer;

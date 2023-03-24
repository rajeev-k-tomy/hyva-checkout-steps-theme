import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { useStepContext } from './hooks';
import { _keys } from '../../../../utils';
import initialValues from './utility/initialValues';
import { useCheckoutFormContext } from '../../../../hooks';
import { isFormPopulatedField } from '../checkoutAgreements/utility';

function StepsContainer({ children }) {
  const { currentStep } = useStepContext();
  const { setFieldValue } = useFormikContext();
  const { formSections, registerFormSection } = useCheckoutFormContext();
  const stepFormSectionIds = (formSections || []).map(
    ({ id: sectionId }) => sectionId
  );

  /**
   * Not all form get registered due to step wise navigation. We will make sure
   * the form is initiated with all form initial values. We didn't complicate it
   * with validation of each form sections though
   */
  useEffect(() => {
    // this will make sure form sections available within the active step is
    // registered first with all its validation and then skip their initialization
    // again here.
    if (stepFormSectionIds.length) {
      _keys(initialValues)
        .filter((id) => !stepFormSectionIds.includes(id))
        .forEach((formSectionId) => {
          registerFormSection({
            id: formSectionId,
            initialValues: initialValues[formSectionId],
            validationSchema: {},
          });
        });
    }
  }, [registerFormSection, stepFormSectionIds]);

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

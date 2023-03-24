import React from 'react';
import { useFormikContext } from 'formik';
import { bool, func, oneOf, shape, string } from 'prop-types';

import Button from '../../../code/common/Button';
import { __ } from '../../../../i18n';
import { useStepContext } from '../step/hooks';
import { validateStep } from '../step/utility';
import { useAppContext, useCheckoutFormContext } from '../../../../hooks';

function ContinueButton({ size, variant, disable, actions, label }) {
  const { values } = useFormikContext();
  const { setErrorMessage } = useAppContext();
  const { formSections, setEnableReinitialize } = useCheckoutFormContext();
  const { currentStep, goToNextStep } = useStepContext();

  const handleContinue = async () => {
    setEnableReinitialize(false);
    let canContinue = true;
    const { errors: hasErrors, message: errorMessage } = await validateStep(
      formSections,
      currentStep,
      values
    );

    if (hasErrors) {
      setErrorMessage(errorMessage);
      return;
    }

    if (actions?.submit) {
      canContinue = await actions.submit();
    }
    if (canContinue) {
      goToNextStep();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        size={size}
        variant={variant}
        disable={disable}
        click={handleContinue}
      >
        {label}
      </Button>
    </div>
  );
}

ContinueButton.propTypes = {
  disable: bool,
  label: string,
  size: oneOf(['sm', 'md', 'lg']),
  actions: shape({ submit: func }),
  variant: oneOf(['success', 'warning', 'primary', 'secondary']),
};

ContinueButton.defaultProps = {
  size: 'md',
  disable: false,
  label: __('Continue'),
  variant: 'primary',
  actions: {
    submit: () => true,
  },
};

export default ContinueButton;

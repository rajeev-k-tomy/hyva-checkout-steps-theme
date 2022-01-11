import React from 'react';
import { object as YupObject } from 'yup';
import { useFormikContext } from 'formik';
import { bool, func, oneOf, shape, string } from 'prop-types';

import Button from '../../../code/common/Button';
import {
  LOGIN_FORM,
  CART_ITEMS_FORM,
  SHIPPING_METHOD,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../../config';
import { useStepContext } from '../step/hooks';
import { useAppContext, useCheckoutFormContext } from '../../../../hooks';

const stepsValidations = {
  1: [LOGIN_FORM, CHECKOUT_AGREEMENTS_FORM],
  2: [
    LOGIN_FORM,
    SHIPPING_ADDR_FORM,
    BILLING_ADDR_FORM,
    CART_ITEMS_FORM,
    CHECKOUT_AGREEMENTS_FORM,
  ],
  3: [
    LOGIN_FORM,
    SHIPPING_ADDR_FORM,
    BILLING_ADDR_FORM,
    CART_ITEMS_FORM,
    SHIPPING_METHOD,
    CHECKOUT_AGREEMENTS_FORM,
  ],
  4: [
    LOGIN_FORM,
    SHIPPING_ADDR_FORM,
    BILLING_ADDR_FORM,
    CART_ITEMS_FORM,
    SHIPPING_METHOD,
    PAYMENT_METHOD_FORM,
    CHECKOUT_AGREEMENTS_FORM,
  ],
};

function ContinueButton({ size, variant, disable, actions, label }) {
  const { values } = useFormikContext();
  const { setErrorMessage } = useAppContext();
  const { formSections } = useCheckoutFormContext();
  const { currentStep, goToNextStep } = useStepContext();

  const handleContinue = async () => {
    const formSectionsToBeValidated = formSections.filter((section) =>
      stepsValidations[currentStep].includes(section.id)
    );

    if (!formSectionsToBeValidated.length) {
      return;
    }

    const validationRules = YupObject().shape(
      formSectionsToBeValidated.reduce((accumulator, section) => {
        accumulator[section.id] = YupObject().shape(section.validationSchema);
        return accumulator;
      }, {})
    );

    try {
      await validationRules.validate(values, { abortEarly: true });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      return;
    }

    if (actions?.submit) {
      await actions.submit();
    }

    goToNextStep();
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
  label: 'Continue',
  variant: 'primary',
  actions: {
    submit: Boolean,
  },
};

export default ContinueButton;

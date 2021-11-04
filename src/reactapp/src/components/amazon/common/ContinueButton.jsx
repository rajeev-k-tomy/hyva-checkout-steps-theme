import React from 'react';
import { bool, func, oneOf, shape } from 'prop-types';

import Button from '../../common/Button/Button';
import useStepContext from '../step/hooks/useStepContext';

function ContinueButton({ size, variant, disable, actions }) {
  const { goToNextStep } = useStepContext();

  return (
    <div className="flex items-center justify-center">
      <Button
        size={size}
        variant={variant}
        disable={disable}
        click={async () => {
          const canContinue = await actions.submit();
          console.log({ canContinue });
          goToNextStep();

          // if (canContinue) {
          //   goToNextStep();
          // }
        }}
      >
        Continue
      </Button>
    </div>
  );
}

ContinueButton.propTypes = {
  disable: bool,
  size: oneOf(['sm', 'md', 'lg']),
  variant: oneOf(['success', 'warning', 'primary', 'secondary']),
  actions: shape({ submit: func }),
};

ContinueButton.defaultProps = {
  size: 'md',
  disable: false,
  variant: 'primary',
  actions: {
    submit: Boolean,
  },
};

export default ContinueButton;

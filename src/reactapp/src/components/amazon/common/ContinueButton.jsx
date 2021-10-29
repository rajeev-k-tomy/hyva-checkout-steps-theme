import React from 'react';
import { bool, oneOf } from 'prop-types';

import Button from '../../common/Button/Button';
import useStepContext from '../step/hooks/useStepContext';

function ContinueButton({ size, variant, disable }) {
  const { goToNextStep } = useStepContext();

  return (
    <div className="flex items-center justify-center">
      <Button
        size={size}
        variant={variant}
        disable={disable}
        click={() => goToNextStep()}
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
};

ContinueButton.defaultProps = {
  size: 'md',
  disable: false,
  variant: 'primary',
};

export default ContinueButton;

import React from 'react';
import { arrayOf, node, number } from 'prop-types';

import useStepContext from './hooks/useStepContext';

function Step({ id, ids, children }) {
  const { currentStep } = useStepContext();
  const stepIds = [...ids, id].map((i) => i);

  if (!stepIds.includes(currentStep)) {
    return <></>;
  }

  return <div>{children}</div>;
}

Step.propTypes = {
  id: number,
  ids: arrayOf(number),
  children: node.isRequired,
};

Step.defaultProps = {
  id: 0,
  ids: [],
};

export default Step;

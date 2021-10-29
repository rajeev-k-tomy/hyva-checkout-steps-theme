import React from 'react';
import { node } from 'prop-types';

import OrderSummary from '../../OrderSummary';
import StepNavigation from '../../StepNavigation';

function MainContentSection({ children }) {
  return (
    <>
      <StepNavigation />
      <div className="flex items-center justify-center">
        <div className="flex items-start justify-between w-full px-20 py-14 bg-container">
          <div className="flex-1">{children}</div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}

MainContentSection.propTypes = {
  children: node.isRequired,
};

export default MainContentSection;

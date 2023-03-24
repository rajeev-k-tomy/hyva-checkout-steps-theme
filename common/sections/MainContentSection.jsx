import React from 'react';
import { node } from 'prop-types';

import OrderSummary from '../../OrderSummary';
import StepNavigation from '../../StepNavigation';
import Message from '../../../../code/common/Message';
import PageLoader from '../../../../code/common/Loader';
import { LOGIN_STEP } from '../../step/utility';
import { useStepContext } from '../../step/hooks';
import { useAppContext, useCartContext } from '../../../../../hooks';

function MainContentSection({ children }) {
  const { orderId } = useCartContext();
  const { pageLoader } = useAppContext();
  const { currentStep } = useStepContext();

  const content = children;
  const summary = <OrderSummary />;

  if (currentStep === LOGIN_STEP) {
    return (
      <>
        {content}
        {summary}
      </>
    );
  }

  return (
    <>
      <StepNavigation />
      <Message />
      <div className="flex items-center justify-center">
        <div className="w-full px-6 py-8 space-y-8 md:space-y-0 md:items-start md:justify-between md:px-20 md:flex md:py-14 bg-container">
          <div className="flex-1">{content}</div>
          {summary}
        </div>
      </div>
      {(pageLoader || orderId) && <PageLoader />}
    </>
  );
}

MainContentSection.propTypes = {
  children: node.isRequired,
};

export default MainContentSection;

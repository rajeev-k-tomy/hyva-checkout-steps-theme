import React from 'react';
import { node } from 'prop-types';

import OrderSummary from '../../OrderSummary';
import Message from '../../../../code/common/Message';
import PageLoader from '../../../../code/common/Loader';
import StepNavigation from '../../StepNavigation';
import { useAppContext, useCartContext } from '../../../../../hooks';

function MainContentSection({ children }) {
  const { orderId } = useCartContext();
  const { pageLoader } = useAppContext();
  return (
    <>
      <StepNavigation />
      <Message />
      <div className="flex items-center justify-center">
        <div className="flex items-start justify-between w-full px-20 py-14 bg-container">
          <div className="flex-1">{children}</div>
          <OrderSummary />
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

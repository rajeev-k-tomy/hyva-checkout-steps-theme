import React from 'react';
import { node } from 'prop-types';

function WellSection({ children }) {
  return (
    <div className="space-y-2">
      <div className="space-x-3 overflow-hidden bg-gray-200 rounded-lg">
        {children}
      </div>
    </div>
  );
}

WellSection.propTypes = {
  children: node.isRequired,
};

export default WellSection;

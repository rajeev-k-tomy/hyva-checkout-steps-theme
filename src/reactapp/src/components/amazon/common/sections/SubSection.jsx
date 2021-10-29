import React from 'react';
import { node, string } from 'prop-types';

function SubSection({ children, title }) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="font-semibold text-xml">{title}</h3>
      </div>
      {children}
    </div>
  );
}

SubSection.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
};

export default SubSection;

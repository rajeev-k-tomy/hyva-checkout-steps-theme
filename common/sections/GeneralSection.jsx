import React from 'react';
import { bool, node, string } from 'prop-types';

import { classNames } from '../../../../../utils';

function GeneralSection({
  title,
  children,
  addTopPadding,
  titleRightContent,
  ...props
}) {
  return (
    <div
      {...props}
      className={classNames(addTopPadding ? 'pt-10' : '', 'space-y-10')}
    >
      <div className="flex items-center justify-between">
        <h2 className="w-full text-xl font-bold text-center md:text-2xl">
          {title}
        </h2>
        {titleRightContent}
      </div>
      {children}
    </div>
  );
}

GeneralSection.propTypes = {
  addTopPadding: bool,
  titleRightContent: node,
  title: string.isRequired,
  children: node.isRequired,
};

GeneralSection.defaultProps = {
  addTopPadding: false,
  titleRightContent: '',
};

export default GeneralSection;

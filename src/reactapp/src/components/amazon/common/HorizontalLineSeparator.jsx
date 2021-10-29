import React from 'react';
import { string } from 'prop-types';

function HorizontalLineSeparator({ word }) {
  if (!word) {
    return <hr />;
  }

  return (
    <div className="flex w-full pt-4">
      <div className="flex-1 border-b" />
      <div className="px-3 -mb-2 text-sm text-gray-300">{word}</div>
      <div className="flex-1 border-b" />
    </div>
  );
}

HorizontalLineSeparator.propTypes = {
  word: string,
};

HorizontalLineSeparator.defaultProps = {
  word: '',
};

export default HorizontalLineSeparator;

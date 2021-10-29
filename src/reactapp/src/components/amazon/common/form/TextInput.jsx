/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { node, string } from 'prop-types';
import { classNames } from '../../../../utils';

function TextInput({ label, leftIcon, type, name, id, placeholder, helpText }) {
  return (
    <div className="w-full">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div
        className={classNames(
          leftIcon ? 'relative rounded-md shadow-sm' : '',
          'mt-1'
        )}
      >
        {leftIcon}
        <input
          type={type}
          name={name}
          id={id || name}
          className={classNames(
            leftIcon ? 'pl-10' : '',
            'block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          )}
          placeholder={placeholder}
        />
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {helpText}
        </p>
      )}
    </div>
  );
}

TextInput.propTypes = {
  id: string,
  type: string,
  label: string,
  leftIcon: node,
  helpText: string,
  placeholder: string,
  name: string.isRequired,
};

TextInput.defaultProps = {
  id: '',
  label: '',
  type: 'text',
  helpText: '',
  leftIcon: '',
  placeholder: '',
};

export default TextInput;

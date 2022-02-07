/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import _get from 'lodash.get';
import { bool, func, node, shape, string } from 'prop-types';
import { ErrorMessage, Field } from 'formik';

import { formikDataShape } from '../../../../../utils/propTypes';
import { classNames, _emptyFunc, _keys, _replace } from '../../../../../utils';

const emptyCallback = _emptyFunc();

function TextInput({
  id,
  type,
  name,
  label,
  actions,
  required,
  leftIcon,
  helpText,
  disabled,
  formikData,
  placeholder,
}) {
  const {
    setFieldValue,
    formSectionId,
    setFieldTouched,
    formSectionErrors,
    formSectionValues,
    formSectionTouched,
  } = formikData;
  const inputId = id || name;
  const relativeFieldName = _replace(name, formSectionId).replace('.', '');
  const hasFieldError = !!_get(formSectionErrors, relativeFieldName);
  const value = _get(formSectionValues, relativeFieldName, '') || '';
  const hasFieldTouched =
    _get(formSectionTouched, relativeFieldName) !== undefined;
  const hasError = hasFieldError && hasFieldTouched;
  const handleKeyDown = actions.handleKeyDown || emptyCallback;
  const handleBlur = actions.handleBlur || emptyCallback;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={classNames(
          hasError ? 'text-red-600' : 'text-gray-700',
          'text-sm font-medium block'
        )}
      >
        <span>{label}</span>
        {required && <sup className="pl-1 text-red-600 -top-1">*</sup>}
      </label>
      <div
        className={classNames(
          leftIcon ? 'relative rounded-md shadow-sm' : '',
          'mt-1'
        )}
      >
        {leftIcon}
        <Field
          type={type}
          name={name}
          id={inputId}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            leftIcon ? 'pl-10' : '',
            hasError
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
            'block w-full sm:text-sm rounded-md'
          )}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            const newValue = event.target.value;
            setFieldTouched(name, newValue);
            setFieldValue(name, newValue);
          }}
        />
      </div>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={`${inputId}-error`}>
          <ErrorMessage name={name}>
            {(msg) => msg.replace('%1', label)}
          </ErrorMessage>
        </p>
      )}
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
  required: bool,
  helpText: string,
  placeholder: string,
  actions: shape({ handleBlur: func }),
  name: string.isRequired,
  formikData: formikDataShape.isRequired,
  disabled: bool,
};

TextInput.defaultProps = {
  id: '',
  label: '',
  actions: {},
  type: 'text',
  helpText: '',
  leftIcon: '',
  placeholder: '',
  required: false,
  disabled: false,
};

export default TextInput;

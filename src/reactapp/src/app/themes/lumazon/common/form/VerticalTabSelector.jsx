/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { arrayOf, func, node, shape, string } from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/solid';

import { classNames } from '../../../../../utils';

function VerticalTabSelector({
  items,
  actions,
  selected,
  children,
  fieldName,
}) {
  return (
    <div className="flex items-start">
      <div
        className={classNames(
          selected && children ? 'w-1/3' : 'flex-1',
          'overflow-hidden bg-white border border-gray-200 rounded-md'
        )}
      >
        <div className="">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className={classNames(
                  item.id === selected
                    ? 'bg-gray-200 font-semibold text-lg border text-primary-darker'
                    : 'text-gray-400 hover:bg-gray-400 hover:text-white',
                  'px-3 py-4 cursor-pointer flex items-center w-full space-x-2'
                )}
                onClick={() => actions.setSelected(item.id)}
              >
                {item.id === selected ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-800" />
                ) : (
                  <input type="radio" name={fieldName} />
                )}
                <div className="w-full">{item.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selected && children && (
        <div className="flex-1">
          <div className="overflow-hidden bg-gray-200 rounded-lg">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

VerticalTabSelector.propTypes = {
  children: node,
  selected: string,
  items: arrayOf(shape({ title: node })),
  actions: shape({ setSelected: func }),
  fieldName: string,
};

VerticalTabSelector.defaultProps = {
  items: [],
  selected: '',
  actions: {},
  children: '',
  fieldName: 'VerticalTabSelector',
};

export default VerticalTabSelector;

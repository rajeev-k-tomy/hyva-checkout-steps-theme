import React from 'react';
import { PlusSmIcon, CheckCircleIcon } from '@heroicons/react/solid';

import { GeneralSection, SubSection } from '../common/sections';
import OtherAddressList from '../address/OtherAddressList';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';
import { classNames } from '../../../utils';

function AddressList() {
  return (
    <GeneralSection
      title="Select a delivery address"
      titleRightContent={
        <div className="flex items-center justify-center pr-6 cursor-pointer hover:text-blue-800">
          <PlusSmIcon className="w-8 h-8" />
          <span className="hover:underline">Add new address</span>
        </div>
      }
    >
      <SubSection title="Most recently used">
        <div className="flex items-start justify-between space-x-8">
          {[1, 2].map((num) => (
            <div key={num} className="flex-1">
              <div
                className={classNames(
                  num === 1 ? 'border border-primary-lighter' : '',
                  'overflow-hidden bg-white rounded-lg shadow hover:border hover:border-gray-400'
                )}
              >
                <div className="px-4 py-5 space-y-3 sm:p-6">
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <h4 className="pb-1 text-base font-semibold">
                        Rajeev K Tomy
                      </h4>
                      {num === 1 ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-800" />
                      ) : (
                        <input type="radio" name="shipping_address.addressId" />
                      )}
                    </li>
                    <li>Kalarithara, Poovam</li>
                    <li>Changanacherry</li>
                    <li>Kottayam, Kerala</li>
                    <li>India</li>
                    <li>
                      <span>Phone:</span>
                      9746935888
                    </li>
                  </ul>
                </div>
                <div className="flex w-full text-sm divide-x bg-gray-50">
                  <button
                    type="button"
                    className="flex-1 py-3 shadow-inner hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 shadow-inner hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection title="Other address options">
        <OtherAddressList />
      </SubSection>

      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default AddressList;

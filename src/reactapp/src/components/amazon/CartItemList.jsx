import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

function CartItemList() {
  return (
    <ul className="divide-y divide-gray-200">
      {[1, 2].map((num) => (
        <li key={num} className="px-4 py-4 sm:px-6">
          <div className="flex flex-wrap space-x-8">
            <div>
              <img
                className="w-20 h-auto"
                alt="MH02"
                src="https://demo.hyva.io/media/catalog/product/cache/238ae5215f777fc7093e66fb635f7f28/m/h/mh02-black_main_1.jpg"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="pb-4 space-y-1">
                  <h3 className="font-semibold text-primary-lighter">
                    Basic Tee
                  </h3>
                  <ul className="space-y-1 text-gray-400">
                    <li>Black</li>
                    <li>Large</li>
                  </ul>
                </div>
                <div className="cursor-pointer">
                  <TrashIcon className="w-4 h-4 text-secondary-lighter hover:text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <strong className="text-base text-secondary">$32.00</strong>
                <select className="text-sm border-gray-300 rounded-md">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartItemList;

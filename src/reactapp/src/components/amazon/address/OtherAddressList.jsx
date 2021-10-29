import React from 'react';

function OtherAddressList() {
  return (
    <ul className="space-y-3">
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="flex items-center overflow-hidden bg-white shadow sm:rounded-md hover:border hover:border-gray-400"
        >
          <div className="flex-1 px-4">
            <span className="text-sm italic">
              Rajeev K Tomy, Kalarithara, Poovam, Changanacherry, Kottayam,
              Kerala, India 696102, Ph: 9746935888
            </span>
          </div>
          <div className="w-1/5">
            <div className="flex flex-col w-full text-sm divide-y bg-gray-50">
              <button
                type="button"
                className="flex-1 py-3 shadow-inner hover:text-blue-800"
              >
                Edit
              </button>
              <button
                type="button"
                className="flex-1 py-3 shadow-inner hover:text-blue-800"
              >
                Choose
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OtherAddressList;

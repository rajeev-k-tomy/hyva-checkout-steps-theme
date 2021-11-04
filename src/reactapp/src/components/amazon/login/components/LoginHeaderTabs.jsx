import React from 'react';

import { classNames } from '../../../../utils';
import { useLoginFormContext } from '../hooks';
import { loginSections } from '../utility';

function LoginHeaderTabs() {
  const { createAccount, activeSection, setActiveSection } =
    useLoginFormContext();
  const tabs = loginSections(createAccount);

  return (
    <nav
      className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
      aria-label="Tabs"
    >
      {tabs.map((tab, tabIdx) => (
        <a
          key={tab.id}
          href={tab.href}
          className={classNames(
            activeSection === tab.id
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
          )}
          aria-current={tab.current ? 'page' : undefined}
          onClick={() => setActiveSection(tab.id)}
        >
          <span>{tab.name}</span>
          <span
            aria-hidden="true"
            className={classNames(
              'absolute inset-x-0 bottom-0 h-0.5',
              activeSection === tab.id ? 'bg-indigo-500' : 'bg-transparent'
            )}
          />
        </a>
      ))}
    </nav>
  );
}

export default LoginHeaderTabs;

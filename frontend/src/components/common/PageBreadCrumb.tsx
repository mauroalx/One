// components/shared/PageBreadcrumb.tsx

import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
  action?: {
    label: string;
    href: string;
  };
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, action }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
      <div className="flex-1 gap-4 flex items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          {pageTitle}
        </h2>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600  dark:hover:bg-brand-500 transition"
          >
            {action.label}
          </Link>
        )}
      </div>
      <nav className="mt-2">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Início
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
      </div>
    </div>
  );
};

export default PageBreadcrumb;

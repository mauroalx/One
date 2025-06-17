"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

type ResultItem = {
  id: string;
  label: string;
  href: string;
};

type Props = {
  results: { [key: string]: ResultItem[] };
  onClose: () => void;
};

const QuickSearchDropdown: React.FC<Props> = ({ results, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-1 w-[430px] max-w-full rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-all duration-150"
    >
      {Object.entries(results).map(([section, items]) => (
        <div
          key={section}
          className="px-4 py-3 border-b last:border-b-0 dark:border-gray-700"
        >
          <h4 className="mb-1 text-xs font-semibold tracking-wide text-gray-400 dark:text-white/40 uppercase">
            {section}
          </h4>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuickSearchDropdown;

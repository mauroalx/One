// components/InputField.tsx
import React from 'react';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const InputField: React.FC<Props> = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
      />
    </div>
  );
};

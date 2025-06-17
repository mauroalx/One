import React, { ReactNode, useState } from "react";

export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  const [show, setShow] = useState(false);
  
  return (
    <div
      className="relative group inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* o children permanecerá onde ele quer, como um elemento inline ou block*/}
      {children}

      {/* o tooltip aparecendo logo a cima, centralizado em relação ao children*/}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap">
          <span className="z-10 p-2 text-xs leading-none text-gray-50 bg-gray-600 shadow-lg rounded-md">
            {message}
          </span>
          <div className="w-3 h-3 rotate-45 bg-gray-600 ml-auto mr-auto" />
        </div>
      )}

    </div>
  );
};


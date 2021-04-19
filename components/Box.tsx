import React from "react";

type BoxProps = {
  header: string | React.ReactNode;
  subheader?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Box({
  children,
  className,
  header,
  subheader,
}: BoxProps) {
  const headerIsElement = React.isValidElement(header);
  return (
    <div
      className={`bg-gray-50 shadow dark:bg-gray-800 dark:text-white p-8 lg:p-16 ${
        className ? className : ""
      }`}
    >
      {header && !headerIsElement && (
        <h1 className="text-2xl font-medium mb-2">{header}</h1>
      )}
      {header && headerIsElement && <>{header}</>}
      {subheader && (
        <h2 className="font-medium text-sm text-indigo-400 dark:text-indigo-300 mb-4 uppercase tracking-wide">
          {subheader}
        </h2>
      )}
      {children}
    </div>
  );
}

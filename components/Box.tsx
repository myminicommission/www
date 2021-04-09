type BoxProps = {
  header: string;
  subheader?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Box({ children, className, header, subheader }: BoxProps) {
  return (
    <div className={`bg-gray-50 shadow dark:bg-gray-800 dark:text-white p-8 lg:p-16 ${className ? className : ""}`}>
      {header && <h1 className="text-2xl font-medium mb-2">{header}</h1>}
      {subheader && (
        <h2 className="font-medium text-sm text-indigo-400 dark:text-indigo-300 mb-4 uppercase tracking-wide">
          {subheader}
        </h2>
      )}
      {children}
    </div>
  );
}

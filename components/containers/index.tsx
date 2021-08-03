type PaperProps = {
  className?: string;
  children: React.ReactNode;
};

export function Paper({ children, className }: PaperProps) {
  return (
    <div className={`bg-gray-800 overflow-hidden shadow rounded ${className}`}>
      {children}
    </div>
  );
}

Paper.Content = function ({ children, className }: PaperProps) {
  return <div className={`px-4 py-5 sm:p-6 ${className}`}>{children}</div>;
};

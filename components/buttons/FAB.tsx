type FABProps = {
  className?: string;
  onClick(): void;
  children: React.ReactNode;
};

export function TinyFAB({ children, className, onClick }: FABProps) {
  return (
    <button
      className={`p-0 w-5 h-5 bg-gray-600 hover:bg-gray-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SmallFAB({ children, className, onClick }: FABProps) {
  return (
    <button
      className={`p-0 w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

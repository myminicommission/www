import { MouseEventHandler } from "react";

type ButtonProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  secondary?: boolean;
  disabled?: boolean;
  baseColor?: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function TinyFAB({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`p-0 w-5 h-5 bg-gray-600 hover:bg-gray-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SmallFAB({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`p-0 w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Button({
  children,
  className,
  onClick,
  secondary,
  disabled,
  baseColor,
}: ButtonProps) {
  const color = baseColor ? baseColor : secondary ? "purple" : "green";
  let classes = `text-white font-bold py-2 px-4 border-b-4 rounded`;

  if (disabled) {
    classes = classNames(
      classes,
      `text-gray-600 bg-gray-700 border-gray-900`,
      "cursor-not-allowed"
    );
  } else {
    classes = classNames(
      classes,
      `bg-${color}-500 hover:border-${color}-500 hover:bg-${color}-400 border-${color}-700`
    );
  }

  if (className !== "") {
    classes = classNames(classes, className);
  }
  return (
    <button className={classes} onClick={onClick ? onClick : () => {}}>
      {children}
    </button>
  );
}

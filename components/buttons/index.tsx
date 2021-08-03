import { MouseEventHandler } from "react";

const XS: string = "xs";
const SM: string = "sm";
const MD: string = "md";
const LG: string = "lg";
const XL: string = "xl";

type ButtonProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  secondary?: boolean;
  disabled?: boolean;
  baseColor?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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

type Dimensions = {
  x: number;
  y: number;
  text: string;
};

function dimsFromSize(size: string): Dimensions {
  let x = 4;
  let y = 2;
  let text = "sm";

  switch (size) {
    case XS:
      x = 2.5;
      y = 1.5;
      text = "xs";
      break;
    case SM:
      x = 3;
      y = 2;
      break;
    case LG:
      text = "base";
      break;
    case XL:
      x = 6;
      y = 3;
      text = "base";
      break;
  }

  return { x, y, text };
}

export function Button({
  children,
  className,
  onClick,
  secondary,
  disabled,
  baseColor,
  size,
}: ButtonProps) {
  const dims = dimsFromSize(size);
  const color = baseColor ? baseColor : secondary ? "purple" : "green";
  let classes = `text-white font-bold inline-flex items-center px-${dims.x} py-${dims.y} border border-transparent text-${dims.text} font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`;

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
    <button
      className={classes}
      onClick={onClick && !disabled ? onClick : () => {}}
    >
      {children}
    </button>
  );
}

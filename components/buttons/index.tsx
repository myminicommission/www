import { MouseEventHandler } from "react";

const XS: string = "xs";
const SM: string = "sm";
const MD: string = "md";
const LG: string = "lg";
const XL: string = "xl";

export type ButtonColors = {
  background: string;
  border: string;
  text?: string;
  hover?: {
    background: string;
    border: string;
    text?: string;
  };
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function stringifyButtonColors(color: ButtonColors): string {
  let classes = `${color.background} ${color.border}`;

  if (color.text) classes = classNames(classes, color.text);

  if (color.hover) {
    classes = classNames(
      classes,
      `${color.hover.background} ${color.hover.border}`
    );

    if (color.hover.text) classes = classNames(classes, color.hover.text);
  }

  return classes;
}

type ButtonProps = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  secondary?: boolean;
  disabled?: boolean;
  baseColor?: ButtonColors;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

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
  x: string;
  y: string;
  text: string;
};

function dimsFromSize(size: string): Dimensions {
  let x = "px-4";
  let y = "py-2";
  let text = "test-sm";

  switch (size) {
    case XS:
      x = "px-2.5";
      y = "py-1.5";
      text = "test-xs";
      break;
    case SM:
      x = "px-3";
      y = "py-2";
      break;
    case LG:
      text = "test-base";
      break;
    case XL:
      x = "px-6";
      y = "py-3";
      text = "test-base";
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
  let classes = `text-white font-bold inline-flex items-center justify-center ${dims.x} ${dims.y} border border-transparent ${dims.text} font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`;

  if (disabled) {
    classes = classNames(
      classes,
      "text-gray-600 bg-gray-700 border-gray-900",
      "cursor-not-allowed"
    );
  } else {
    const purple: ButtonColors = {
      background: "bg-purple-500",
      border: "border-purple-700",
      hover: {
        background: "hover:bg-purple-400",
        border: "hover:border-purple-500",
      },
    };

    const green: ButtonColors = {
      background: "bg-green-500",
      border: "border-green-700",
      hover: {
        background: "hover:bg-green-400",
        border: "hover:border-green-500",
      },
    };

    const color: ButtonColors = baseColor
      ? baseColor
      : secondary
      ? purple
      : green;
    classes = classNames(classes, stringifyButtonColors(color));
  }

  classes = classNames(classes, className);

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick && !disabled ? onClick : () => {}}
    >
      {children}
    </button>
  );
}

"use client";
import clxs from "clsx";
interface IButton {
  type?: TypeButton;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  borderRadiusFull?: boolean;
  disable?: boolean;
  secondary?: boolean;
  danger?: boolean;
}
type TypeButton = "button" | "submit" | "reset" | undefined;
export default function Button(props: IButton) {
  const {
    children,
    type = "button",
    fullWidth,
    danger,
    disable,
    borderRadiusFull,
    onClick,
    secondary,
  } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable}
      className={clxs(
        "flex justify-center text-sm font-semibold px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        fullWidth && "w-full",
        borderRadiusFull ? "rounded-full" : "rounded-md",
        disable && "opacity-50 cursor-default",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
}

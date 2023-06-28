"use client";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

interface IDesktopItem {
  label: string;
  href: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}
const DesktopItem = (props: IDesktopItem) => {
  const { label, href, active, icon: Icon, onClick } = props;
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "flex items-center w-full rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon onClick={onClick} className="cursor-pointer h-5 w-5 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;

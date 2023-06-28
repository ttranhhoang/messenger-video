"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface IMobileItem {
  href: string;
  active?: boolean;
  icon: IconType;
  onClick?: () => void;
}
const MobileItem = (props: IMobileItem) => {
  const { href, active, icon: Icon, onClick } = props;
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <li onClick={handleClick} className="w-full">
      <Link
        href={href}
        className={clsx(
          "flex justify-center gap-x-3 text-sm font-semibold leading-6 w-full p-3 text-gray-500 hover:text-black hover:bg-gray-100",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="w-6 h-6" />
      </Link>
    </li>
  );
};

export default MobileItem;

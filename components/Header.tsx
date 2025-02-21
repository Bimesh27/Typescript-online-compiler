import React from "react";
import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";
import { BiLogoTypescript } from "react-icons/bi";

const Header = () => {
  return (
    <header className="px-20 py-2 border-b flex justify-between items-center h-24">
      <Link href={"/"}>
        <div className="font-bold text-2xl flex items-end">
          <BiLogoTypescript className="text-blue-500 text-4xl" />
          <h1 className="text-lg font-bold">Only</h1>
        </div>
        <p className="text-gray-500 tracking-wide text-sm">
          TypeScript online compiler
        </p>
      </Link>
      <ModeToggle />
    </header>
  );
};

export default Header;

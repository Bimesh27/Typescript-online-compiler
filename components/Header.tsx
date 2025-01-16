import React from "react";
import { ModeToggle } from "./ThemeToggle";
import Link from "next/link";
import { BiLogoTypescript } from "react-icons/bi";

const Header = () => {
  return (
    <header className="px-4 py-2 border-b flex justify-between items-center">
      <Link href={"/"} className="font-bold text-2xl flex items-end">
        <BiLogoTypescript className="text-blue-500 text-4xl" />
        <h1 className="text-lg font-bold">Only</h1>
      </Link>
      <ModeToggle />
    </header>
  );
};

export default Header;

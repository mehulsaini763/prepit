"use client";

import Link from "next/link";

import { Button } from "@/components/material-tailwind/components";

import Menu from "./menu";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <div
      className={"flex justify-between items-center w-full max-w-6xl"}
    >
      <span className="text-xl font-semibold">Basic Funda</span>
      <div className="hidden md:flex items-center justify-between gap-8">
        <Link
          className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={`text-gray-500 hover:text-gray-800 transition-colors duration-300 ${
            pathname.includes("/articles") && "font-medium text-gray-900"
          }`}
          href={"#articles"}
        >
          Articles
        </Link>
        <Link
          className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
          href={"/#testimonials"}
        >
          Testimonials
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-2 justify-between">
        <Link href={"/signin"}>
          <Button variant="outlined" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
      <Menu />
    </div>
  );
};

export default Header;

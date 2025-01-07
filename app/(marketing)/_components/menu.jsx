import Link from "next/link";
import { usePathname } from "next/navigation";

import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

import {
  Button,
  Drawer,
  IconButton,
} from "@/components/material-tailwind/components";
import { useState } from "react";

const Menu = () => {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => setDrawer(!drawer);

  return (
    <>
      <IconButton
        variant="text"
        className="md:hidden rounded-full"
        onClick={handleDrawer}
      >
        <Bars3Icon className="h-6 w-6" />
      </IconButton>
      <Drawer
        placement="top"
        open={drawer}
        className="flex flex-col gap-16 justify-center"
        size={1080}
      >
        <div className="flex flex-col items-center justify-between gap-8 text-2xl">
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
        <div className="flex items-center gap-8 justify-center">
          <Link href={"/signin"}>
            <Button variant="outlined" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button size="lg">Sign Up</Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 m-4">
          <IconButton variant="text" onClick={handleDrawer}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </Drawer>
    </>
  );
};

export default Menu;

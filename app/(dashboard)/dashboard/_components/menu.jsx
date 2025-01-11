"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import {
  Button,
  Drawer,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/material-tailwind/components";

import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";

// Icons imports
import {
  Bars3Icon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

// Typography import
import { Typography } from "@/components/material-tailwind/components";

const menu = () => {
  const [modal, setModal] = useState(false);
  const handleDialog = () => setModal(!modal);

  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => setDrawer(!drawer);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    handleDialog();
    await signOut(auth);
    window.location.assign;
  };

  const buttonClass = "flex items-center gap-4 text-base";
  // Function to dynamically generate class names based on the current pathname
  const getLinkProps = (path) => {
    return pathname === path
      ? { variant: "gradient", className: buttonClass }
      : { variant: "text", color: "gray", className: buttonClass };
  };

  useEffect(() => {
    drawer && handleDrawer();
  }, [pathname]);
  return (
    <>
      <IconButton
        variant="text"
        className="md:hidden rounded-full"
        onClick={handleDrawer}
      >
        <Bars3Icon className="h-7 w-7" />
      </IconButton>
      <Drawer open={drawer} placement="right" size={1080}>
        <div className="flex items-center justify-end m-4">
          <IconButton variant="text" onClick={handleDrawer}>
            <XMarkIcon className="h-7 w-7" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-2 p-4 h-full">
          <Link href="/dashboard/tests">
            <Button size="md" fullWidth {...getLinkProps("/dashboard/tests")}>
              <ClipboardDocumentListIcon className="h-7 w-7" />
              My Tests
            </Button>
          </Link>
          {/* <Link href="/dashboard/reports">
            <Button size="md" fullWidth {...getLinkProps("/dashboard/reports")}>
              <ChartBarIcon className="h-7 w-7" />
              Reports
            </Button>
          </Link> */}
          <Link href="/dashboard/profile">
            <Button size="md" fullWidth {...getLinkProps("/dashboard/profile")}>
              <UserCircleIcon className="h-7 w-7" />
              Profile
            </Button>
          </Link>
          <Link href="/dashboard/help">
            <Button size="md" fullWidth {...getLinkProps("/dashboard/help")}>
              <ChatBubbleLeftEllipsisIcon className="h-7 w-7" />
              Help Desk
            </Button>
          </Link>
          <Button
            className={buttonClass}
            variant="text"
            color="gray"
            onClick={handleDialog}
          >
            <ArrowLeftEndOnRectangleIcon className="h-7 w-7" />
            Log Out
          </Button>
        </div>
      </Drawer>
      <Dialog open={modal} size="sm">
        <DialogHeader className="flex items-center justify-between">
          Confirmation{" "}
          <IconButton
            size="sm"
            variant="text"
            className="rounded-full"
            onClick={handleDialog}
          >
            <XMarkIcon className="w-5 h-5" />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-center gap-2 justify-center py-8 md:flex-row">
            <ExclamationTriangleIcon className="h-8 w-8 text-blue-500" />{" "}
            <Typography variant="h6">
              Are you sure you want to Logout?
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex items-center gap-2">
          <Button variant="outlined" onClick={handleDialog}>
            <span>Cancel</span>
          </Button>
          <Button onClick={handleLogout}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default menu;

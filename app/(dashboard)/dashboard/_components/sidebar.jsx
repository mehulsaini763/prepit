"use client";

// React imports
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Material Tailwind Imports
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@/components/material-tailwind/components";

// Firebase imports
import { auth } from "@/configs/firebase";
import { signOut } from "firebase/auth";

// Icons imports
import {
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
import { deleteCookie } from "@/utils/misc";

// Sidebar component
const Sidebar = () => {
  const [modal, setModal] = useState(false);
  const handleDialog = () => setModal(!modal);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await deleteCookie("[BF USER]");
    await signOut(auth);
    handleDialog();
    router.push("/");
  };

  const buttonClass = "flex items-center gap-2 text-sm md:gap-4";
  // Function to dynamically generate class names based on the current pathname
  const getLinkProps = (path) => {
    return pathname === path
      ? { variant: "gradient", className: buttonClass }
      : { variant: "text", color: "gray", className: buttonClass };
  };

  return (
    <div className="hidden w-1/5 md:flex flex-col gap-2 h-full p-2 border-r">
      {/* Links for the sidebar */}
      <Link href="/dashboard/tests">
        <Button size="md" fullWidth {...getLinkProps("/dashboard/tests")}>
          <ClipboardDocumentListIcon className="h-5 w-5 hidden md:block" />
          My Tests
        </Button>
      </Link>
      {/* <Link href="/dashboard/reports">
        <Button size="md" fullWidth {...getLinkProps("/dashboard/reports")}>
          <ChartBarIcon className="h-5 w-5 hidden md:block" />
          Reports
        </Button>
      </Link> */}
      <Link href="/dashboard/profile">
        <Button size="md" fullWidth {...getLinkProps("/dashboard/profile")}>
          <UserCircleIcon className="h-5 w-5 hidden md:block" />
          Profile
        </Button>
      </Link>
      <Link href="/dashboard/help">
        <Button size="md" fullWidth {...getLinkProps("/dashboard/help")}>
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5 hidden md:block" />
          Help Desk
        </Button>
      </Link>
      {/* Logout button */}
      <Button
        className={[buttonClass, "mt-auto"]}
        variant="text"
        color="gray"
        onClick={handleDialog}
      >
        <ArrowLeftEndOnRectangleIcon className="h-5 w-5 hidden md:block" />
        Log Out
      </Button>
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
          <div className="flex items-center gap-2 justify-center py-8">
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
    </div>
  );
};

export default Sidebar;

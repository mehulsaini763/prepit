"use client";

// Import necessary icons and components
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  // Button,
  Input,
  Spinner,
} from "@/components/material-tailwind/components";

// Import custom components for the page
import TestsTable from "./_components/tests-table";
import TestSetup from "./_components/test-setup";
import SubscriptionModal from "./_components/subscription-modal";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/misc";

const MyTestsPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getCookie("[PI USER]");
      setUser(user);
    })();
  }, []);

  return !user ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Spinner color="blue" className="h-8 w-8" />
    </div>
  ) : (
    <div className="h-full flex flex-col gap-4 p-2 overflow-hidden">
      {/* Search bar and Test Setup button */}
      <div
        // className={`flex items-center justify-end gap-4`}

        className={`flex items-center justify-between gap-4`}
      >
        {/* Input field for search */}
        <div className="flex items-center gap-2 w-full">
          <Input
            type="search"
            label="Search"
            color="blue"
            size="md"
            containerProps={{ className: "hidden md:block !w-48" }}
            icon={<MagnifyingGlassIcon className="h-4 w-4" />}
          />
          {!user.isSubscribed && <SubscriptionModal user={user} />}
        </div>
        <TestSetup user={user} />
      </div>
      {/* Tests table */}
      <TestsTable user={user} />
    </div>
  );
};

export default MyTestsPage;

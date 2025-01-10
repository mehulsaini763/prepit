"use client";

// Import necessary icons and components
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  // Button,
  // Input,
  Spinner,
} from "@/components/material-tailwind/components";

// Import custom components for the page
import TestsTable from "./_components/tests-table";
import TestSetup from "./_components/test-setup";
// import SubscriptionModal from "./_components/subscription-modal";
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
        className={`flex items-center justify-end gap-4`}

        // className={`flex items-center ${
        //   user.isSubscribed ? "justify-between" : "justify-end"
        // } gap-4`}
      >
        {/* Input field for search */}
        {/* {user.isSubscribed ? (
          <>
            <div>
              <Input
                type="search"
                label="Search"
                color="blue"
                size="md"
                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-2">
              <TestSetup user={user} />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button>Free Test</Button>
            <SubscriptionModal user={user} />
          </div>
        )} */}
        <TestSetup user={user} />
      </div>
      {/* Tests table */}
      <TestsTable user={user} />
    </div>
  );
};

export default MyTestsPage;

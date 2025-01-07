'use client'

import QueriesTable from "./_components/queries-table";
import QuerySetup from "./_components/query-setup";

// Import custom components for the page

const HelpDeskPage = () => {

  return (
    <div className="h-full flex flex-col gap-4 p-2">
      {/* Search bar and Test Setup button */}
      <div className="flex items-center justify-between gap-4">
        {/* Input field for search */}
        <div></div>
        {/* Test setup button */}
        <QuerySetup />
      </div>
      {/* Tests table */}
      <QueriesTable />
    </div>
  );
};

export default HelpDeskPage;

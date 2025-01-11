"use client";

import axios from "axios";

const page = () => {
  return (
    <button
      onClick={async () => await axios.post("/api/test/process", { test })}
    >
      CALL API
    </button>
  );
};

export default page;

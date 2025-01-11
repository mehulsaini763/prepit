"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Spinner } from "@/components/material-tailwind/components";
import axios from "axios";
import { decryptData } from "@/utils/misc";

const SubmissionPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const test = await decryptData(
          JSON.parse(sessionStorage.getItem("test"))
        );
        sessionStorage.removeItem("test");
        sessionStorage.removeItem("activeQuestionIndex");
        sessionStorage.removeItem("activeSectionIndex");
        setStatus(true);
        axios("/api/test/process/evaluate", {
          method: "POST",
          data: test,
        });
        await axios("/api/test/process/initiate", {
          method: "POST",
          data: test,
        });
      } catch (error) {
        console.log("SUBMISSION ERROR");
        router.push("/dashboard/tests");
      }
    })();
  }, []);

  return status ? (
    <div className="flex flex-col h-full justify-center items-center gap-8">
      <div className="text-xl font-semibold">
        You test is submitted Successfully
      </div>
      <div>
        <Button
          className="rounded-sm hover:shadow-none"
          onClick={() => window.location.assign("/dashboard/tests")}
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col h-full justify-center items-center">
      <Spinner color="blue" className="h-12 w-12" />
    </div>
  );
};

export default SubmissionPage;

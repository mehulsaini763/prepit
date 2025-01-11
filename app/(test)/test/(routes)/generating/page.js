"use client";

import { deleteDocument } from "@/utils/db";
import { deleteCookie, encryptData, getCookie, setCookie } from "@/utils/misc";
import { createTest } from "@/utils/test";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CreationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    (async () => {
      const token = await getCookie("token");

      if (!token) {
        router.push("/dashboard/tests");
        return;
      }

      if (searchParams.get("user") == "test")
        await deleteDocument("tests/userTests", token.userId);

      const data = await createTest(token);

      if (!data) {
        alert("No Questions Found");
        return router.push("/dashboard/tests");
      }

      const test = await encryptData(data);
      const activeSectionIndex = await encryptData(0);
      const activeQuestionIndex = await encryptData(0);

      sessionStorage.setItem("test", JSON.stringify(test));
      sessionStorage.setItem(
        "activeSectionIndex",
        JSON.stringify(activeSectionIndex)
      );
      sessionStorage.setItem(
        "activeQuestionIndex",
        JSON.stringify(activeQuestionIndex)
      );

      await deleteCookie("token");

      await setCookie("instructionsSession", {
        testId: data.testId,
        expiresIn: "5m",
      });

      router.push(`/test/instructions`);
    })();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <p className="text-gray-600">Your test is being prepared</p>
    </div>
  );
};

export default CreationPage;

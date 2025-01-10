"use client";

import { getDocument, setDocument } from "@/utils/db";

const Page = () => {
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          console.log("called api");
          await setDocument("formats", "mockFull", {
            sections: [
              {
                sectionId: "qa",
                sectionName: "Quantitative Aptitude",
                totalCaselets: 0,
                totalQuestions: 10,
              },
              {
                sectionId: "varc",
                sectionName: "Verbal Ability & Reading Comprehension",
                totalCaselets: 0,
                totalQuestions: 10,
              },
              {
                sectionId: "dilr",
                sectionName: "Data Interpretation & Logical Reasoning",
                totalCaselets: 0,
                totalQuestions: 10,
              },
            ],
            testType: "mockFull",
            totalTime: {
              h: "1",
              m: "30",
            },
          });
        }}
      >
        CALL API
      </button>
    </div>
  );
};

export default Page;

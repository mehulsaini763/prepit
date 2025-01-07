"use client";

import { decryptData, deleteCookie, getCookie, setCookie } from "@/utils/misc";
import { Button, Spinner } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const InstructionPage = () => {
  const router = useRouter();

  const [test, setTest] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const cookie = await getCookie("instructionsSession");

        if (!cookie) {
          router.push("/dashboard/tests");
          return;
        }

        const test = await decryptData(
          JSON.parse(sessionStorage.getItem("test"))
        );

        setTest(test);
      } catch (error) {
        console.log("SESSION OR TEST ERROR", error);
        router.push("/dashboard/tests");
      }
    })();
  }, []);

  const handleTest = async () => {
    await deleteCookie("instructionsSession");
    if (test.totalTime.h != 0) {
      const hoursToMinutes = +test.totalTime.h * 60;
      const expiresIn = `${hoursToMinutes + +test.totalTime.m}m`;
      await setCookie("testSession", { testId: test.testId, expiresIn });
    } else {
      const expiresIn = `${test.totalTime.m}m`;
      await setCookie("testSession", { testId: test.testId, expiresIn });
    }

    router.push(`/test/cat`);
  };

  const instructionTable = [
    {
      icon: (
        <div className="h-8 w-8 text-base bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-500 rounded-md font-semibold flex flex-col items-center justify-center">
          1
        </div>
      ),
      iconMeaning: "You have not visited the question yet",
      button: "Mark for Review & Next",
      buttonMeaning: "Use this to mark and go to next",
    },
    {
      icon: (
        <div className="h-8 w-8 text-base bg-gradient-to-b from-orange-800 to-red-900 text-white font-semibold rounded-md flex flex-col items-center justify-center">
          3
        </div>
      ),
      iconMeaning: "You have not answered the question",
      button: "Clear Response",
      buttonMeaning: "Use this to clear selection or marking.",
    },
    {
      icon: (
        <div className="h-8 w-8 text-base bg-gradient-to-b from-lime-500 to-light-green-700 text-white font-semibold rounded-md flex flex-col items-center justify-center">
          5
        </div>
      ),
      iconMeaning: "You have answered the question.",
      button: "Save & Next",
      buttonMeaning: "Use this to save and go to next.",
    },
    {
      icon: (
        <div className="h-8 w-8 text-base bg-deep-purple-300 border border-deep-purple-600 text-white font-semibold rounded-full flex flex-col items-center justify-center">
          7
        </div>
      ),
      iconMeaning:
        "You have NOT answered the question, but have marked the question for review.",
      button: "Question",
      buttonMeaning: "Use this to View the Question Paper",
    },
    {
      icon: (
        <div className="relative h-8 w-8 text-base bg-deep-purple-300 border border-deep-purple-600 text-white font-semibold rounded-full flex flex-col items-center justify-center">
          9
          <div className="absolute right-0 top-0 -m-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="4"
              stroke="currentColor"
              className="w-4 h-4 text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
      ),
      iconMeaning: "You have answered the question, but marked it for review.",
      button: "Instruction",
      buttonMeaning: "Use this to View Instructions",
    },
  ];
  return !test ? (
    <div className="flex flex-col grow justify-center items-center">
      <Spinner color="blue" className="h-12 w-12" />
    </div>
  ) : (
    <>
      <div className="bg-blue-700 flex items-center justify-between text-white text-3xl px-4 py-2 border-b w-full">
        <div className="font-extrabold">Basic Funda</div>
        <div className="font-semibold">CAT</div>
      </div>
      <div className="h-full m-4 p-2 border border-gray-500 overflow-y-scroll">
        <p className="text-center p-2 font-semibold">
          Please read the following information carefully
        </p>
        <div className="p-2 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <p className="underline">Total Number of Questions:</p>
            {test.totalQuestions}
          </div>
          <div className="flex items-center gap-2">
            <p className="underline">Total Time Available: </p>
            {test.totalTime.h != 0 ? test.totalTime.h + " " + "hours" : ""}{" "}
            {test.totalTime.m != 0 ? test.totalTime.m + " " + "minutes" : ""}{" "}
          </div>
        </div>
        <div className="w-full p-2">
          <table className="table table-auto border-collapse text-sm w-full border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700">Section</th>
                <th className="border border-gray-700">Section Name</th>
                <th className="border border-gray-700">Total Questions</th>
                <th className="border border-gray-700">Max Score</th>
                <th className="border border-gray-700">Marks for Correct</th>
                <th className="border border-gray-700">
                  Negative Marks for Wrong
                </th>
              </tr>
            </thead>
            <tbody>
              {test.sections.map((section, i) => (
                <tr key={i}>
                  <td className="border border-gray-700">{i + 1}</td>
                  <td className="border border-gray-700">
                    {section.sectionName}
                  </td>
                  <td className="border border-gray-700">
                    {section.questions.length}
                  </td>
                  <td className="border border-gray-700">
                    {section.questions.length * 3}
                  </td>
                  <td className="border border-gray-700">3</td>
                  <td className="border border-gray-700">-1</td>
                  {/* <td className="border border-gray-700">undefined</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 w-full p-2 gap-2 py-8">
          {instructionTable.map((o, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="basis-1/12 flex justify-center">{o.icon}</div>
              <p className="basis-5/12">{o.iconMeaning}</p>
              <div className="basis-3/12">
                <div
                  className={`rounded-sm ${
                    i == 2 ? "bg-blue-500" : "bg-blue-300"
                  } text-white text-center p-2 h-fit w-60 shrink-0 text-nowrap`}
                >
                  {o.button}
                </div>
              </div>
              <div className="basis-3/12">
                <p>{o.buttonMeaning}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 p-2 text-sm">
          <div>
            <p className="font-semibold underline">General Instructions:</p>
            <ul className="list-disc">
              <li>
                Total of{" "}
                {test.totalTime.h != 0 ? test.totalTime.h + " " + "hours" : ""}{" "}
                {test.totalTime.m != 0
                  ? test.totalTime.m + " " + "minutes"
                  : ""}{" "}
                duration will be given to attempt all the questions.
              </li>
              <li>
                The clock has been set at the server and the countdown timer at
                the top right corner of your screen will display the time
                remaining for you to complete the exaWhen the clock runs out the
                exam ends by default you are not required to end or submit your
                exam.
              </li>
              <li>
                The question palette at the right of screen helps you navigate
                through the questions.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold underline">Navigating to a Question:</p>
            <ul className="list-disc">
              <li>
                To select a question to answer, you can do one of the following:
                <ol className="list-decimal">
                  <li>
                    Click on the question number on the question palette at the
                    right of your screen to go to that numbered question
                    directly. Note that using this option does NOT save your
                    answer to the current question.
                  </li>
                  <li>
                    Click on Save and Next to save answer to current question
                    and to go to the next question in sequence.
                  </li>
                  <li>
                    Click on Mark for Review and Next to save answer to current
                    question, mark it for review, and to go to the next question
                    in sequence.
                  </li>
                </ol>
              </li>
              <li>
                You can view the entire paper by clicking on the Question Paper
                button.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold underline">Answering a Question</p>
            <ul className="list-disc">
              <li>
                For multiple choice type question:
                <ol className="list-decimal">
                  <li>
                    To select your answer, click on one of the option buttons
                  </li>
                  <li>
                    To change your answer, click the another desired option
                    button
                  </li>
                  <li>
                    To save your answer, you MUST click on{" "}
                    <strong>Save & Next</strong>
                  </li>
                  <li>
                    To deselect a chosen answer, click on the chosen option
                    again or click on the <strong>Clear Response</strong> button
                  </li>
                  <li>
                    To mark the question for review, click on the{" "}
                    <strong>Mark for Review & Next</strong> button.{" "}
                    <i className="text-red-600 font-semibold">
                      If an answer is selected for a question that is Marked for
                      Review, that answer will be considered in the evaluation.
                    </i>
                  </li>
                </ol>
              </li>
              <li>
                To change an answer to a question, first select the question and
                then click on the new answer option followed by a click on the{" "}
                <strong>Save & Next</strong> button.
              </li>
              <li>
                Questions that are saved or marked for review after answering
                will ONLY be considered for evaluation.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold underline">
              Naviagting through Sections
            </p>
            <ul className="list-disc">
              {/* <li>Each section has SOME MINUTES</li> */}
              <li>Once you submit a section, you cannot return to it</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end p-2">
          <Button className="rounded-sm" onClick={handleTest}>
            Start Test
          </Button>
        </div>
      </div>
      <div className="w-full p-2 bg-blue-700 border-t" />
    </>
  );
};

export default InstructionPage;

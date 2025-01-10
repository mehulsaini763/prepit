import { Button, Radio } from "@material-tailwind/react";
import { useContext } from "react";
import { TestContext } from "../../page";
import Image from "next/image";

const MainPanel = () => {
  const {
    test,
    activeSectionIndex,
    activeQuestionIndex,
    handleInput,
    markAsReviewAndNext,
    clearResponse,
    saveAndNext,
  } = useContext(TestContext);

  const question =
    test.sections[activeSectionIndex].questions[activeQuestionIndex];

  return (
    <div
      className="h-full w-3/4 flex flex-col border border-gray-500 rounded-sm"
      key={activeQuestionIndex}
    >
      <div className="p-2 font-semibold">
        Question No {activeQuestionIndex + 1}
      </div>
      <div className="flex w-full h-full border-y border-gray-500">
        <div className="w-1/2 flex flex-col gap-2 overflow-y-scroll p-2">
          {question.isCaselet && (
            <div
              className="active_question_panel"
              dangerouslySetInnerHTML={{ __html: question.caseletSituation }}
            />
          )}
          {question.imageUrl && (
            <Image
              src={question.imageUrl}
              width={200}
              height={100}
              className="w-full h-48 object-contain border"
            />
          )}
          {question.question && (
            <div
              className="active_question_panel"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-4 p-2 overflow-y-scroll">
          {question?.options?.map((option, i) => (
            <Radio
              type="radio"
              key={i}
              name={"option" + activeQuestionIndex}
              label={option}
              ripple={false}
              color="blue"
              className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
              onChange={(e) => handleInput(+e.target.value + 1)}
              checked={
                test.sections[activeSectionIndex].questions[activeQuestionIndex]
                  .chosenOption -
                  1 ===
                i
              }
              value={i}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-auto  border-gray-500 p-1 rounded-sm">
        <div className="flex items-center gap-2">
          <Button
            className="rounded-sm bg-blue-300"
            onClick={markAsReviewAndNext}
          >
            Mark for Review & Next
          </Button>
          <Button className="rounded-sm bg-blue-300" onClick={clearResponse}>
            Clear Response
          </Button>
        </div>
        <div>
          <Button className="rounded-sm bg-blue-700" onClick={saveAndNext}>
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;

import { Button } from "@material-tailwind/react";
import { useContext } from "react";
import { TestContext } from "../../page";

const InstructionPanel = ({ setActivePanel }) => {
  const { test, activeSectionIndex } = useContext(TestContext);
  const section = test.sections[activeSectionIndex];
  return (
    <div className="h-full w-3/4">
      <div className="h-full flex flex-col border border-gray-500 rounded-sm">
        <div className="h-full p-2">
          <p className="text-center text-xl font-semibold">
            {section.sectionName}
          </p>
          <div className="p-4">
            <p className="font-semibold">
              Total Number of Questions: {section.questions.length}
            </p>
            <p className="font-semibold">Total Time Available:</p>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-gray-500 gap-2 p-1">
          <Button
            className="rounded-sm bg-blue-300"
            onClick={() => setActivePanel("main")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstructionPanel;

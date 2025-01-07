import { useContext, useEffect } from 'react';
import { twJoin } from 'tailwind-merge';
import { TestContext } from '../../page';

const notVisitedCSS =
  'text-base bg-gradient-to-b from-gray-100 to-gray-300 border border-gray-500 font-semibold rounded-md flex flex-col items-center justify-center shrink-0';
const notAnsweredCSS =
  'text-base bg-gradient-to-b from-orange-800 to-red-900 rounded-md flex flex-col items-center justify-center text-white shrink-0';
const answeredCSS =
  'text-base bg-gradient-to-b from-lime-500 to-light-green-700 text-white font-semibold rounded-md flex flex-col items-center justify-center text-white shrink-0';
const markedCSS =
  'text-base bg-gradient-to-b from-deep-purple-200 to-deep-purple-300 border border-deep-purple-600 text-white font-semibold rounded-full flex flex-col items-center justify-center text-white shrink-0';

const SidePanel = () => {
  const { test, activeQuestionIndex, activeSectionIndex, setQuestionIndex, setActivePanel } = useContext(TestContext);

  useEffect(() => {
    test.sections[activeSectionIndex].questions[activeQuestionIndex].isVisited = true;
  }, [activeQuestionIndex, activeSectionIndex]);

  const section = test.sections[activeSectionIndex];

  return (
    <div className="w-1/4 flex flex-col gap-2 h-full bg-blue-50 border border-gray-500 p-2 rounded-sm">
      <p className="px-2 text-sm">
        You are Viewing <strong className="font-semibold">{section.sectionName}</strong> section Question Palette
      </p>
      <div className="flex flex-col justify-center items-center h-full w-full overflow-hidden">
        <div className="w-40 rounded-sm grid m-0 gap-2 py-4 grid-cols-4 overflow-y-auto">
          {section.questions.map((q, i) => {
            return (
              <div
                className={twJoin(
                  q.isMarked ? markedCSS : q.isVisited ? (q.isAnswered ? answeredCSS : notAnsweredCSS) : notVisitedCSS,
                  'h-8 w-8'
                )}
                key={i}
                onClick={() => setQuestionIndex(i)}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        <p className="font-semibold px-2">Legend</p>
        <div className="p-2 grid grid-cols-2 gap-4 text-xs xl:text-sm justify-between">
          <div className="flex items-center gap-2">
            <div className={twJoin(answeredCSS, 'h-6 w-6')}></div>
            Answered
          </div>
          <div className="flex items-center gap-2">
            <div className={twJoin(notAnsweredCSS, 'h-6 w-6')}></div>
            Not Answered
          </div>
          <div className="flex items-center gap-2">
            <div className={twJoin(markedCSS, 'h-6 w-6')}></div>
            Marked
          </div>
          <div className="flex items-center gap-2">
            <div className={twJoin(notVisitedCSS, 'h-6 w-6')}></div>
            Not Visited
          </div>
        </div>
      </div>
      <div className="p-2 grid grid-cols-2 gap-4">
        <div
          className="rounded-sm bg-blue-300 text-white text-center truncate text-xs xl:text-sm p-1"
          onClick={() => setActivePanel('questionPaper')}
        >
          Question Paper
        </div>
        <div
          className="rounded-sm bg-blue-300 text-white text-center truncate text-xs xl:text-sm p-1"
          onClick={() => setActivePanel('instruction')}
        >
          Instruction
        </div>
        <div
          className="rounded-sm bg-blue-300 text-white text-center truncate text-xs xl:text-sm p-1"
          onClick={() => setActivePanel('profile')}
        >
          Profile
        </div>
        <div
          className="rounded-sm bg-blue-300 text-white text-center truncate text-xs xl:text-sm p-1"
          onClick={() => setActivePanel('submit')}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default SidePanel;

import { useContext } from 'react';
import { TestContext } from '../../page';
import { Button } from '@material-tailwind/react';

const QuestionPaperPanel = ({ setActivePanel }) => {
  const { test, activeSectionIndex } = useContext(TestContext);
  return (
    <div className="w-3/4 flex flex-col border border-gray-500 rounded-sm">
      <div className="h-full overflow-y-auto px-2 divide-y divide-gray-500">
        {test.sections[activeSectionIndex].questions.map((q, i) => (
          <div key={i}>
            <p className="text-lg py-2">Question No {i + 1}</p>
            <p className="py-2">{q.question}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center border-t border-gray-500 gap-2 p-1">
        <Button className="rounded-sm bg-blue-300" onClick={() => setActivePanel('main')}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default QuestionPaperPanel;

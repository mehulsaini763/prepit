import { useContext } from 'react';
import { TestContext } from '../../page';
import { Button } from '@/components/material-tailwind/components';

const SubmitPanel = ({ setActivePanel }) => {
  const { test, handleSubmit } = useContext(TestContext);

  return (
    <div className="absolute inset-0 bg-white grid place-content-center">
      <div className="space-y-4">
        <p className="text-center p-2 font-semibold text-xl">Exam Summary</p>

        <div className="w-full p-2">
          <table className="table table-auto border-collapse text-sm w-full border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700">Section</th>
                <th className="border border-gray-700">Section Name</th>
                <th className="border border-gray-700">No of Questions</th>
                <th className="border border-gray-700">Answered</th>
                <th className="border border-gray-700">Not Answered</th>
                <th className="border border-gray-700">Marked for Review</th>
                <th className="border border-gray-700">Not Visited</th>
              </tr>
            </thead>
            <tbody>
              {test.sections.map(
                (section, i) =>
                  section.isVisited && (
                    <tr key={i}>
                      <td className="border border-gray-700">{i + 1}</td>
                      <td className="border border-gray-700">{section.sectionName}</td>
                      <td className="border border-gray-700">{section.questions.length}</td>
                      <td className="border border-gray-700">
                        {section.questions.filter((q, i) => q.isAnswered).length}
                      </td>
                      <td className="border border-gray-700">
                        {section.questions.filter((q, i) => !q.isAnswered).length}
                      </td>
                      <td className="border border-gray-700">
                        {section.questions.filter((q, i) => q.isMarked).length}
                      </td>
                      <td className="border border-gray-700">
                        {section.questions.filter((q, i) => !q.isVisited).length}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center text-lg">
          <p>Are you sure you want to submit?</p>
          <p>
            you <strong>CANNOT</strong> return to this section after submission
          </p>
        </div>
        <div className="flex items-center justify-center gap-8 p-4">
          <Button className="rounded-sm bg-blue-300 text-white" onClick={() => setActivePanel('main')}>
            Back
          </Button>
          <Button className="rounded-sm bg-blue-300 text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPanel;

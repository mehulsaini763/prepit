'use client';

import { useContext, useEffect } from 'react';
import { TestContext } from '../../page';

const Tabs = () => {
  const { test, activeSectionIndex, setTest } = useContext(TestContext);

  useEffect(() => {
    if (test) {
      test.sections[activeSectionIndex].isVisited = true;
      setTest({ ...test });
    }
  }, [activeSectionIndex]);

  return (
    <div className="w-3/4 flex items-center gap-1 border border-gray-500 p-1 rounded-sm">
      {test?.sections?.map((section, i) => (
        <div
          key={i}
          className={`rounded-sm text-xs xl:text-sm p-2 text-white cursor-default w-full text-center text-nowrap ${
            section.isSubmitted ? 'bg-gray-700' : section.isVisited ? 'bg-blue-700' : 'bg-blue-300'
          }`}
        >
          {section.sectionName}
        </div>
      ))}
    </div>
  );
};

export default Tabs;

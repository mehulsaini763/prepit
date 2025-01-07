'use client';

import { createContext, useEffect, useState } from 'react';

import { Spinner } from '@material-tailwind/react';

import Tabs from './_components/main/tabs';
import Profile from './_components/main/profile';
import MainPanel from './_components/main/main-panel';
import SidePanel from './_components/main/side-panel';
import SubmitPanel from './_components/main/submit-panel';
import InstructionPanel from './_components/main/instruction-panel';
import QuestionPaperPanel from './_components/main/question-paper-panel';
import ProfilePanel from './_components/main/profile-panel';

import { useRouter } from 'next/navigation';

import { encryptData, decryptData, deleteCookie } from '@/utils/misc';

export const TestContext = createContext();

const TestingPage = () => {
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [activeSectionIndex, setSectionIndex] = useState(0);
  const [activeQuestionIndex, setQuestionIndex] = useState(0);
  const [activePanel, setActivePanel] = useState('main');

  const handleEncryption = async (key, value) => {
    const response = await encryptData(value);
    sessionStorage.setItem(key, JSON.stringify(response));
  };

  const handleDecryption = async (key) => await decryptData(JSON.parse(sessionStorage.getItem(key)));

  const handleInput = (value) => {
    test.sections[activeSectionIndex].questions[activeQuestionIndex].chosenOption = value;
    setTest({ ...test });
  };

  const markAsReviewAndNext = () => {
    test.sections[activeSectionIndex].questions[activeQuestionIndex].isMarked = true;
    activeQuestionIndex + 1 < test.sections[activeSectionIndex].questions.length &&
      setQuestionIndex(activeQuestionIndex + 1);
  };

  const clearResponse = () => {
    test.sections[activeSectionIndex].questions[activeQuestionIndex].chosenOption = -1;
    test.sections[activeSectionIndex].questions[activeQuestionIndex].isMarked = false;
    test.sections[activeSectionIndex].questions[activeQuestionIndex].isAnswered = false;
    setTest({ ...test });
  };

  const saveAndNext = () => {
    test.sections[activeSectionIndex].questions[activeQuestionIndex].isAnswered = true;
    setQuestionIndex(
      activeQuestionIndex + 1 < test.sections[activeSectionIndex].questions.length ? activeQuestionIndex + 1 : 0
    );
  };

  const handleSubmit = async () => {
    test.sections[activeSectionIndex].isSubmitted = true;
    if (activeSectionIndex + 1 < test.sections.length) {
      setSectionIndex(activeSectionIndex + 1);
      setQuestionIndex(0);
      setActivePanel('main');
    } else {
      sessionStorage.removeItem('activeQuestionIndex');
      sessionStorage.removeItem('activeSectionIndex');
      await deleteCookie('testSession');
      router.push(`/test/submitted`);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const decryptedTest = await handleDecryption('test');
        const decryptedSectionIndex = await handleDecryption('activeSectionIndex');
        const decryptedQuestionIndex = await handleDecryption('activeQuestionIndex');
        setTest(decryptedTest);
        setSectionIndex(decryptedSectionIndex);
        setQuestionIndex(decryptedQuestionIndex);
      } catch (error) {
        router.push('/dashboard/tests');
      }
    })();
  }, []);

  useEffect(() => {
    if (test) {
      setTest({ ...test });
      handleEncryption('test', test);
      handleEncryption('activeSectionIndex', activeSectionIndex);
      handleEncryption('activeQuestionIndex', activeQuestionIndex);
    }
  }, [activeSectionIndex, activeQuestionIndex]);

  const context = {
    test,
    setTest,
    activeSectionIndex,
    setSectionIndex,
    activeQuestionIndex,
    setQuestionIndex,
    setActivePanel,
    handleInput,
    markAsReviewAndNext,
    clearResponse,
    saveAndNext,
    handleSubmit,
  };

  return test?.testId ? (
    <TestContext.Provider value={context}>
      <div className="relative flex flex-col p-2 gap-2 h-full overflow-hidden">
        <div className="flex gap-2">
          <Tabs />
          <Profile />
        </div>
        <div className="w-full h-full flex gap-2 overflow-hidden">
          {activePanel == 'submit' ? (
            <SubmitPanel setActivePanel={setActivePanel} />
          ) : activePanel == 'main' ? (
            <MainPanel />
          ) : activePanel == 'instruction' ? (
            <InstructionPanel setActivePanel={setActivePanel} />
          ) : activePanel == 'questionPaper' ? (
            <QuestionPaperPanel setActivePanel={setActivePanel} />
          ) : (
            activePanel == 'profile' && <ProfilePanel setActivePanel={setActivePanel} />
          )}

          <SidePanel setActivePanel={setActivePanel} />
        </div>
      </div>
    </TestContext.Provider>
  ) : (
    <div className="flex flex-col h-full justify-center items-center">
      <Spinner color="blue" className="h-12 w-12" />
    </div>
  );
};

export default TestingPage;

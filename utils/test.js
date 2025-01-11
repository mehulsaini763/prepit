"use server";

import { Timestamp } from "firebase/firestore";
import { getCollection, getData, getDocument, getDocumentByQuery } from "./db";
import { v4 } from "uuid";

const sectionTypes = [
  {
    id: "qa",
    name: "Quantitative Aptitude",
  },
  {
    id: "varc",
    name: "Verbal Ability & Reading Comprehension",
  },
  {
    id: "dilr",
    name: "Data Interpretation & Logical Reasoning",
  },
];

const questionDefaults = {
  isVisited: false,
  isMarked: false,
  isAnswered: false,
  chosenOption: -1,
};

const sectionDefaults = {
  isVisited: false,
  isSubmitted: false,
};

export const createTest = async (token) => {
  try {
    const test = await getDocument("formats", token.testType);

    const timestamp = Timestamp.now();

    test.testId = `PIT${timestamp.seconds}`;
    test.userId = token.userId;
    test.userEmail = token.userEmail;
    test.userName = token.userName;

    if (token.testType == "topic") {
      return await topicTest(token, test);
    }

    if (token.testType == "section") {
      test.sections[0].sectionId = token.sectionId;
      test.sections[0].sectionName = sectionTypes.find(
        (v, i) => v.id == token.sectionId
      ).name;
    }

    for (let i = 0; i < test.sections.length; i++) {
      // ########## FETCH ALL QUESTIONS ##########
      const questions = await getCollection(
        token.testType == "section"
          ? token.sectionId
          : test.sections[i].sectionId
      );
      const length = questions.length;

      if (length == 0) {
        return false;
      }

      const selectedTopics = [];

      // ########## SEPARATE AND SELECT QUESTIONS BASED ON TOPIC & ISCASELET  ##########
      const caseletQuestions = [];
      const nonCaseletQuestion = [];

      questions.forEach((question) => {
        if (selectedTopics.includes(question.topic) && question.isCaselet) {
          caseletQuestions.push(question);
        } else {
          nonCaseletQuestion.push(question);
        }
      });

      // ########## ADDING CASELET QUESTIONS ##########
      const selectedQuestions = [];

      for (let j = 0; j < test.sections[i].totalCaselets; j++) {
        while (selectedQuestions.length < test.sections[i].totalQuestions) {
          const randomIndex = Math.floor(Math.random() * length);
          const question = caseletQuestions[randomIndex];

          if (!selectedTopics.includes(question.topic)) {
            if (selectedTopics.length != 6) {
              selectedTopics.push(question.topic);
            } else continue;
          }

          const caseletId = question.caseletId;

          const alreadyExist = selectedQuestions.find(
            (question) => question.caseletId == caseletId
          );

          if (alreadyExist) {
            continue;
          }

          caseletQuestions.forEach(
            (question) =>
              question.caseletId == caseletId &&
              selectedQuestions.push({
                ...question,
                ...questionDefaults,
              })
          );

          break;
        }
      }

      // ########## ADDING NONCASELET QUESTIONS ##########
      while (selectedQuestions.length < test.sections[i].totalQuestions) {
        const randomIndex = Math.floor(Math.random() * length);
        const question = nonCaseletQuestion[randomIndex];

        if (!selectedTopics.includes(question.topic)) {
          if (selectedTopics.length != 6) {
            selectedTopics.push(question.topic);
          } else continue;
        }

        selectedQuestions.push({
          ...question,
          ...questionDefaults,
        });
      }

      test.sections[i].topics = selectedTopics;
      test.sections[i] = { ...test.sections[i], ...sectionDefaults };
      test.sections[i].questions = selectedQuestions;
    }

    return test;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const topicTest = async (token, test) => {
  try {
    test.sections[0].sectionId = token.sectionId;
    test.sections[0].sectionName = sectionTypes.find(
      (v, i) => v.id == token.sectionId
    ).name;
    test.sections[0].topics = [token.topic];
    
    const { data: questions } = await getData({
      path: token.sectionId,
      filters: [
        { field: "topic", value: token.topic },
        { field: "isCaselet", value: false },
      ],
    });

    const length = questions.length;

    if (length == 0) {
      return false;
    }

    const selectedQuestions = [];

    while (selectedQuestions.length < test.sections[0].totalQuestions) {
      const randomIndex = Math.floor(Math.random() * length);
      const question = questions[randomIndex];

      if (question.topic == token.topic) {
        selectedQuestions.push({ ...question, ...questionDefaults });
      }
    }

    test.sections[0].questions = selectedQuestions;
    test.sections[0] = { ...test.sections[0], ...sectionDefaults };

    return test;
  } catch (error) {
    console.log(error);
    return false;
  }
};

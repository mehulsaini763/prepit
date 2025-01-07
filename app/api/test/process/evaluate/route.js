export const dynamic = "force-dynamic";

import { log } from "console";

import { db } from "@/configs/firebase";
import {
  doc,
  serverTimestamp,
  setDoc,
  runTransaction,
} from "firebase/firestore";

import axios from "axios";

export async function POST(request) {
  try {
    log("Test processing started");

    const test = await request.json();

    const evaluatedSections = [];

    for (const section of test.sections) {
      let totalCorrect = 0;
      let totalIncorrect = 0;
      let totalAttempted = 0;
      let totalNotAttempted = 0;
      for (const question of section.questions) {
        if (question.isAnswered) {
          question.chosenOption == question.correctOption
            ? totalCorrect++
            : totalIncorrect++;
          totalAttempted++;
        } else totalNotAttempted++;
      }
      const totalScore = totalCorrect * 3 - totalIncorrect;
      evaluatedSections.push({
        ...section,
        totalCorrect,
        totalIncorrect,
        totalAttempted,
        totalNotAttempted,
        totalScore: totalScore < 0 ? 0 : totalScore,
        totalMarks: section.totalQuestions * 3,
      });
    }

    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalAttempted = 0;
    let totalNotAttempted = 0;
    let totalQuestions = 0;
    let totalScore = 0;

    for (const section of evaluatedSections) {
      totalCorrect += section.totalCorrect;
      totalIncorrect += section.totalIncorrect;
      totalAttempted += section.totalAttempted;
      totalNotAttempted += section.totalNotAttempted;
      totalScore += section.totalScore;
      totalQuestions += section.totalQuestions;
    }

    const evaluatedTest = {
      ...test,
      sections: evaluatedSections,
      totalCorrect,
      totalIncorrect,
      totalAttempted,
      totalNotAttempted,
      totalScore,
      totalMarks: totalQuestions * 3,
      totalQuestions,
    };

    if (
      evaluatedTest.testType == "mockMini" ||
      evaluatedTest.testType == "mockFull"
    ) {
      const response = await axios
        .post(`${process.env.BASE_URL}/api/test/process/pdf`, evaluatedTest)
        .then((res) => res.data)
        .catch((err) => log(err.response.data));

      const buffer = response.data.data;

      await axios.post(`${process.env.BASE_URL}/api/test/process/mail`, {
        userEmail: test.userEmail,
        testId: test.testId,
        buffer,
      });
    }

    const docRef = doc(db, "tests", "userTests", test.userId, test.testId);
    await setDoc(docRef, {
      ...evaluatedTest,
      isProcessed: true,
      createdAt: serverTimestamp(),
    });

    await axios.patch(
      `${process.env.BASE_URL}/api/test/process/evaluate`,
      evaluatedTest
    );

    return Response.json(
      { success: true, message: "Test Processed" },
      { status: 200 }
    );
  } catch (error) {
    // log(error);
    log("Test processing failed");
    return Response.json(
      { success: false, message: "Test processing failed" },
      { status: 200 }
    );
  }
}

export async function PATCH(request) {
  try {
    const test = await request.json();

    if (!test) {
      throw new Error("Test object is undefined or null");
    }

    console.log(`Questions process request received for test: ${test.testId}`);

    for (const section of test.sections) {
      for (const question of section.questions) {
        await runTransaction(db, async (transaction) => {
          const docRef = doc(db, section.sectionId, question.questionId);
          const docSnap = await transaction.get(docRef);

          if (question.isAnswered) {
            const attempts = docSnap.data().metrics.attempts + 1;
            const correct =
              question.correctOption == question.chosenOption
                ? docSnap.data().metrics.correct + 1
                : docSnap.data().metrics.correct;
            const incorrect =
              question.correctOption != question.chosenOption
                ? docSnap.data().metrics.incorrect + 1
                : docSnap.data().metrics.incorrect;
            const difficultyRatio = (incorrect / attempts) * 100;

            const metrics = {
              attempts,
              correct,
              incorrect,
              difficultyRatio,
            };

            transaction.update(docRef, {
              metrics,
            });
          }
        });
      }
    }

    console.log(`Questions updated for test: ${test.testId}`);

    return Response.json(
      { success: true, message: "Questions Processed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      `Error updating questions for test ${test?.testId}: ${error.message}`
    );
    return Response.json(
      { success: false, message: "Questions Processing Failed" },
      { status: 500 }
    );
  }
}

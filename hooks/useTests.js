import { useState } from 'react';

import { db, storage } from '@/configs/firebase';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';

import axios from 'axios';
import { getDownloadURL, ref } from 'firebase/storage';

const useTests = () => {
  const [test, setTest] = useState(null);
  const [tests, setTests] = useState(null);

  const [progress, setProgess] = useState(0);
  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(true);
  const [processing, setProcessing] = useState(true);

  const sectionTypes = [
    {
      id: 'qa',
      name: 'Quantitative Aptitude',
    },
    {
      id: 'varc',
      name: 'Verbal Ability & Reading Comprehension',
    },
    {
      id: 'dilr',
      name: 'Data Interpretation & Logical Reasoning',
    },
  ];

  const questionDefaults = {
    visited: false,
    marked: false,
    answered: false,
    chosenOption: -1,
  };

  const fetchTest = async (type) => {
    const docRef = doc(db, 'formats', type);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const createTest = async (userId, userEmail, userName, type, section, topic) => {
    setCreating(true);
    setProgess(20);

    const test = await fetchTest(type);

    const response = await axios('/api/timestamp', { method: 'GET' });
    const timestamp = response.data;

    test.id = `BFT${timestamp.seconds}`;
    test.score = 0;
    test.userId = userId;
    test.userEmail = userEmail;
    test.userName = userName;

    if (section) {
      test.sections[0].sectionId = section;
      test.sections[0].sectionName = sectionTypes.find((v, i) => v.id == section).name;
    }

    try {
      for (let i = 0; i < test.sections.length; i++) {
        setProgess(progress + 20);

        const questions = [];

        const querySnapshot = await getDocs(collection(db, section ? section : test.sections[i].sectionId));
        const length = querySnapshot.size;

        const caseletQuestions = [];
        //add caselets
        for (let j = 0; j < test.sections[i].totalCaselets; j++) {
          while (caseletQuestions.length < test.sections[i].totalQuestions) {
            const randomIndex = Math.floor(Math.random() * length);
            const doc = querySnapshot.docs[randomIndex];

            if (doc.data().isCaselet) {
              const caseletId = doc.data().caseletId;

              const alreadyExist = caseletQuestions.find((question) => question.caseletId == caseletId);

              if (alreadyExist) continue;

              querySnapshot.forEach(
                (doc) =>
                  doc.data().caseletId == caseletId &&
                  caseletQuestions.push({
                    ...doc.data(),
                    ...questionDefaults,
                  })
              );

              break;
            }
          }
        }

        //add random questions
        while (questions.length < test.sections[i].totalQuestions - caseletQuestions.length) {
          const randomIndex = Math.floor(Math.random() * length);
          const doc = querySnapshot.docs[randomIndex];
          if (!doc.data().isCaselet) {
            if (topic) {
              if (doc.data().topic == topic) {
                questions.push({
                  ...doc.data(),
                  ...questionDefaults,
                });
              }
            } else {
              questions.push({
                ...doc.data(),
                ...questionDefaults,
              });
            }
          }
        }

        caseletQuestions.forEach((question) => questions.push(question));

        test.sections[i].questions = questions;
      }
    } catch (error) {
      console.log(error);
    }
    setProgess(100);
    setTest(() => ({ ...test }));
  };

  const readTests = async (id) => {
    setReading(true);
    const testsCollection = collection(db, 'tests', 'userTests', id);
    const testsQueryRef = query(testsCollection, orderBy('createdAt', 'desc'));
    const testsSnap = await getDocs(testsQueryRef);
    const tests = [];
    testsSnap.forEach((doc) => tests.push(doc.data()));
    setTests(tests);
    setReading(false);
  };

  const downloadTest = async (userId, testId) => {
    try {
      // Get the download URL
      const url = await getDownloadURL(ref(storage, `users/${userId}/tests/${testId}`));

      // Fetch the file as a blob
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${testId}.pdf`; // Set the desired file name
        document.body.appendChild(link); // Append link to the body
        link.click(); // Simulate a click to trigger the download
        document.body.removeChild(link); // Clean up by removing the link
        URL.revokeObjectURL(link.href); // Free up memory
      };
      xhr.open('GET', url);
      xhr.send();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return {
    test,
    tests,
    progress,
    creating,
    createTest,
    reading,
    readTests,
    downloadTest,
  };
};

export default useTests;

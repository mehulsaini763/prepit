import { useState } from 'react';

import { db } from '@/configs/firebase';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import axios from 'axios';

const useQueries = () => {
  const [queries, setQueries] = useState(null);

  const [creating, setCreating] = useState(false);
  const [reading, setReading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const createQuery = async (fullName, email, category, query) => {
    setCreating(true);
    const timestamp = (await axios('/api/timestamp')).data;

    await setDoc(doc(db, 'queries', `PIQ${timestamp.seconds}`), {
      category: category,
      createdAt: serverTimestamp(),
      openRequest: query,
      reOpenRequest: '',
      status: 'open',
      resolvedResponse: '',
      closedResponse: '',
      email: email,
      fullName: fullName,
      updatedAt: serverTimestamp(),
    });

    setCreating(false);
  };

  const readQueries = async (email) => {
    setReading(true);
    const q = query(collection(db, 'queries'), orderBy('createdAt', 'desc'), where('email', '==', email));
    const queries = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      queries.push({ ...doc.data(), id: doc.id });
    });
    setQueries(queries);
    setReading(false);
  };

  const updateQuery = async (id, data) => {
    try {
      setUpdating(true);
      await updateDoc(doc(db, 'queries', id), {
        ...data,
        updatedAt: serverTimestamp(),
      });
      setUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    queries,
    creating,
    createQuery,
    reading,
    readQueries,
    updating,
    updateQuery,
  };
};

export default useQueries;

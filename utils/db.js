"use server";

import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  where,
  serverTimestamp,
} from "@firebase/firestore";

export const getDocument = async (collectionName, docId) => {
  const docSnap = await getDoc(doc(db, collectionName, `${docId}`));
  if (docSnap.exists()) {
    const data = JSON.parse(JSON.stringify(docSnap.data()));
    return data;
  } else {
    return null;
  }
};

export const getDocumentByQuery = async (
  collectionName,
  param1,
  condition,
  param2
) => {
  const docs = [];
  try {
    const queryRef = query(
      collection(db, collectionName),
      where(param1, condition, param2)
    );
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => docs.push(doc.data()));
    const data = JSON.parse(JSON.stringify(docs));
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCollection = async (collectionName) => {
  const docs = [];
  try {
    const collectionSnapshot = await getDocs(collection(db, collectionName));
    collectionSnapshot.forEach((doc) => docs.push(doc.data()));
    const data = JSON.parse(JSON.stringify(docs));
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCollectionByOrder = async (collectionName, order) => {
  const docs = [];
  try {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), orderBy(order, "desc"))
    );
    querySnapshot.forEach((doc) => docs.push(doc.data()));
    const data = JSON.parse(JSON.stringify(docs));
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCollectionByQueryOrder = async (
  collectionName,
  param1,
  condition,
  param2,
  order
) => {
  const docs = [];
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where(param1, condition, param2),
        orderBy(order, "desc")
      )
    );
    querySnapshot.forEach((doc) => docs.push(doc.data()));

    const data = JSON.parse(JSON.stringify(docs));

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setDocument = async (
  collectionName,
  docId,
  data,
  timestamp = false
) => {
  try {
    const docData = timestamp
      ? { ...data, createdAt: serverTimestamp() }
      : data;

    await setDoc(doc(db, collectionName, `${docId}`), docData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(db, collectionName, `${docId}`), data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, `${docId}`));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getData = async ({
  path,
  filters = [],
  orderByFields = [],
  // searchQuery = null,
  // lastDoc = [],
  // docLimit = 20,
  // docCount = null,
}) => {
  try {
    if (!path) return;

    const collectionRef = Array.isArray(path)
      ? collection(db, ...path)
      : collection(db, path);
    let q = query(collectionRef);

    orderByFields.forEach(({ field, direction = "asc" }) => {
      q = query(q, orderBy(field, direction));
    });

    filters.forEach(({ field, condition = "==", value }) => {
      q = query(q, where(field, condition, value));
    });

    // if (searchQuery) {
    //   const { field, value } = searchQuery;
    //   q = query(
    //     q,
    //     where(field, ">=", value),
    //     where(field, "<=", value + "\uf8ff")
    //   );
    // }

    // if (lastDoc.length != 0) {
    //   q = query(q, startAfter(...lastDoc));
    // }

    // let count = 0;
    // if (docCount) {
    //   const countSnapshot = await getCountFromServer(q);
    //   count = countSnapshot.data().count;
    // }

    // if (docLimit) {
    //   q = query(q, limit(docLimit));
    // }

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // const lastVisible = snapshot.docs.length
    //   ? orderByFields.map(({ field }) =>
    //       snapshot.docs[snapshot.docs.length - 1].get(field)
    //     )
    //   : null;
    // const hasMore = snapshot.docs.length === docLimit;

    return {
      data,
      // lastVisible: lastVisible ? lastVisible : [],
      // hasMore,
      // count,
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return {
      data: [],
      // lastVisible: [],
      // hasMore: false,
      //  count: 0
    };
  }
};

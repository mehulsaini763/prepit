import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy as orderByFn,
  setDoc,
  deleteDoc,
  limit as limitFn,
  where as whereFn,
  getCountFromServer,
  startAfter,
  runTransaction,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "@/configs/firebase.js";

export const getDocument = async (path, id) => {
  const docRef = Array.isArray(path) ? doc(db, ...path, id) : doc(db, path, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? JSON.parse(JSON.stringify(docSnap.data())) : null;
};

export const getDocuments = async (path, { field = "id", values }) => {
  if (!Array.isArray(values) || values.length == 0) return [];
  const collectionRef = Array.isArray(path)
    ? collection(db, ...path)
    : collection(db, path);
  const q = query(collectionRef, whereFn(field, "in", values));
  const querySnap = await getDocs(q);
  return !querySnap.empty
    ? JSON.parse(
        JSON.stringify(
          querySnap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      )
    : [];
};

export const setDocument = async (path, id, data, timestamp = null) => {
  try {
    const docData = timestamp ? { ...data, [timestamp]: serverTimestamp() } : data;
    const docRef = Array.isArray(path)
      ? doc(db, ...path, id)
      : doc(db, path, id);
    await setDoc(docRef, docData);
    return true;
  } catch (error) {
    console.error("Error setting document:", error);
    return false;
  }
};

export const setDocuments = async (path, documents, timestamp = null) => {
  try {
    await runTransaction(db, async (transaction) => {
      documents.forEach((document) => {
        const docData = timestamp
          ? { ...document, [timestamp]: serverTimestamp() }
          : document;
        const docRef = Array.isArray(path)
          ? doc(db, ...path, document.id || document.uid)
          : doc(db, path, document.id || document.uid);
        transaction.set(docRef, docData);
      });
    });
    return true;
  } catch (error) {
    console.error("Transaction failed: ", error);
    return false;
  }
};

export const updateDocument = async (path, id, data, timestamp = null) => {
  try {
    const docData = timestamp ? { ...data, [timestamp]: serverTimestamp() } : data;
    const docRef = Array.isArray(path)
      ? doc(db, ...path, id)
      : doc(db, path, id);
    await updateDoc(docRef, docData);
    return true;
  } catch (error) {
    console.error("Error setting document:", error);
    return false;
  }
};

export const updateDocuments = async (path, documents, timestamp = null) => {
  try {
    await runTransaction(db, async (transaction) => {
      documents.forEach((document) => {
        const docData = timestamp
          ? { ...document, [timestamp]: serverTimestamp() }
          : document;
        const docRef = Array.isArray(path)
          ? doc(db, ...path, document.id || document.uid)
          : doc(db, path, document.id || document.uid);
        transaction.update(docRef, docData);
      });
    });
    return true;
  } catch (error) {
    console.error("Transaction failed: ", error);
    return false;
  }
};

export const deleteDocument = async (path, id) => {
  try {
    const docRef = Array.isArray(path)
      ? doc(db, ...path, id)
      : doc(db, path, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};

export const deleteDocuments = async (path, documents) => {
  try {
    await runTransaction(db, async (transaction) => {
      documents.forEach((document) => {
        const docRef = Array.isArray(path)
          ? doc(db, ...path, document.id || document.uid)
          : doc(db, path, document.id || document.uid);
        transaction.delete(docRef);
      });
    });
    return true;
  } catch (error) {
    console.error("Transaction failed: ", error);
    return false;
  }
};

export const getData = async ({
  path = false,
  where = [],
  orderBy = [],
  search = false,
  lastDoc = [],
  limit = 20,
  count = false,
  source = false,
}) => {
  try {
    if (!path) return;

    const collectionRef = Array.isArray(path)
      ? collection(db, ...path)
      : collection(db, path);
    let q = query(collectionRef);

    orderBy.forEach(({ field, direction = "asc" }) => {
      q = query(q, orderByFn(field, direction));
    });

    where.forEach(({ field, condition = "==", value }) => {
      q = query(q, whereFn(field, condition, value));
    });

    if (search) {
      const { field, value } = search;
      q = query(
        q,
        whereFn(field, ">=", value),
        whereFn(field, "<=", value + "\uf8ff")
      );
    }

    if (lastDoc.length != 0) {
      q = query(q, startAfter(...lastDoc));
    }

    if (count) {
      const countSnapshot = await getCountFromServer(q);
      count = countSnapshot.data().count;
    }

    if (limit) {
      q = query(q, limitFn(limit));
    }

    if (source) {
      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
        });
      });
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const lastVisible = snapshot.docs.length
      ? orderBy.map(({ field }) =>
          snapshot.docs[snapshot.docs.length - 1].get(field)
        )
      : null;
    const hasMore = snapshot.docs.length === limit;

    return {
      docs: docs ?? [],
      lastDoc: lastVisible ?? [],
      hasMore,
      count,
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return { docs: [], lastDoc: [], hasMore: false, count: 0 };
  }
};

export const getCount = async (path, where = []) => {
  try {
    const collectionRef = Array.isArray(path)
      ? collection(db, ...path)
      : collection(db, path);
    let q = query(collectionRef);

    where.forEach(({ field, condition = "==", value }) => {
      q = query(q, whereFn(field, condition, value));
    });

    const countSnapshot = await getCountFromServer(q);
    return countSnapshot.data().count;
  } catch (error) {
    console.error("Error getting document count:", error);
    return 0;
  }
};

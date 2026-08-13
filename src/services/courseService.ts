import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const courseRef = collection(db, "courses");

export const addCourseFirestore = async (course: any) => {
  return await addDoc(courseRef, {
    ...course,
    createdAt: serverTimestamp(),
  });
};

export const getCoursesFirestore = async () => {
  const snapshot = await getDocs(courseRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteCourseFirestore = async (id: string) => {
  await deleteDoc(doc(db, "courses", id));
};

export const updateCourseFirestore = async (
  id: string,
  data: any
) => {
  await updateDoc(doc(db, "courses", id), data);
};
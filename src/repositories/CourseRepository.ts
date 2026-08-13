import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { createCourse } from "../models/CourseModel";
import { Course } from "../types";

const courseCollection = collection(db, "courses");

export class CourseRepository {

  static async getAllCourses(): Promise<Course[]> {

    const snapshot = await getDocs(courseCollection);

    return snapshot.docs.map((document) =>

      createCourse({
        id: document.id,
        ...document.data(),
      })

    );
  }

  static async addCourse(course: Partial<Course>) {

    await addDoc(courseCollection, {
      ...createCourse(course),
      createdAt: serverTimestamp(),
    });

  }

  static async updateCourse(
    id: string,
    data: Partial<Course>
  ) {

    await updateDoc(
      doc(db, "courses", id),
      data
    );

  }

  static async deleteCourse(id: string) {

    await deleteDoc(
      doc(db, "courses", id)
    );

  }

}

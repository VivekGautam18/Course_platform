import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { createCourse } from "../models/CourseModel";
import { Course } from "../types";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "courses"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) =>
          createCourse({
            id: doc.id,
            ...doc.data(),
          })
        );

        setCourses(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading courses:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    courses,
    loading,
  };
};

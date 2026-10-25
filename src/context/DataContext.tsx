// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase/firebase";
// import {
//   addCourseFirestore,
//   deleteCourseFirestore,
//   updateCourseFirestore,
// } from "../services/courseService";
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   Course,
//   MentorshipOption,
//   MentorshipEnrollment,
//   StrategySessionBooking,
//   Testimonial,
//   Payment,
//   StudentProgress,
//   UserPurchase,
//   Video,
//   PDFResource,
//   Chapter,
// } from '../types';
// import {
//   INITIAL_COURSES,
//   INITIAL_MENTORSHIPS,
//   INITIAL_TESTIMONIALS,
// } from '../data/initialData';
// import { useAuth } from './AuthContext';

// interface DataContextType {
//   courses: Course[];
//   mentorships: MentorshipOption[];
//   testimonials: Testimonial[];
//   mentorshipEnrollments: MentorshipEnrollment[];
//   strategyBookings: StrategySessionBooking[];
//   payments: Payment[];
//   studentPurchases: UserPurchase;
//   studentProgress: Record<string, StudentProgress>;

//   // Actions
//   unlockCourse: (courseId: string, paymentInfo: Partial<Payment>) => void;
//   enrollMentorship: (
//     mentorshipId: string,
//     formData: {
//       studentName: string;
//       studentEmail: string;
//       mobile: string;
//       attempt: string;
//       college: string;
//       currentPreparationLevel: string;
//       amountPaid: number;
//       paymentId: string;
//     }
//   ) => void;
//   bookStrategySession: (bookingData: {
//     studentName: string;
//     studentEmail: string;
//     contactNumber: string;
//     attempt: string;
//     date: string;
//     timeSlot: string;
//     primaryStruggle: string;
//     amountPaid: number;
//     paymentId: string;
//   }) => void;

//   markVideoCompleted: (courseId: string, videoId: string) => void;
//   updateLastWatched: (courseId: string, videoId: string) => void;

//   // Admin Operations
//   addCourse: (course: Omit<Course, 'id' | 'rating' | 'reviewCount'>) => Promise<void>;
//   updateCourse: (courseId: string, updated: Partial<Course>) => Promise<void>;
//   deleteCourse: (courseId: string) => Promise<void>;
//   addChapterToCourse: (courseId: string, chapter: Omit<Chapter, 'id'>) => void;

//   updateMentorshipPrice: (id: string, newPrice: number) => void;
//   addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
//   deleteTestimonial: (id: string) => void;

//   // Checkers
//   isCoursePurchased: (courseId: string) => boolean;
//   isMentorshipPurchased: (mentorshipId: string) => boolean;
//   hasBookedStrategySession: () => boolean;
// }

// const DEFAULT_PURCHASES: UserPurchase = {
//   userId: 'student_1',
//   courseIds: ['c1'], // Default unlocked 1 course for immediate testing
//   mentorshipIds: ['m_sept26_both'], // Default unlocked 1 mentorship for testing
//   strategySessionIds: [],
// };

// const DEFAULT_ENROLLMENTS: MentorshipEnrollment[] = [
//   {
//     id: 'e1',
//     userId: 'student_1',
//     studentName: 'Aarav Patel',
//     studentEmail: 'aarav.student@gmail.com',
//     mobile: '+91 91234 56789',
//     attempt: 'CA Inter Sept 2026',
//     college: 'HR College of Commerce',
//     currentPreparationLevel: '50% Syllabus Complete',
//     mentorshipId: 'm_sept26_both',
//     mentorshipTitle: 'CA Inter Sept 2026 - Both Groups Mentorship',
//     amountPaid: 2000,
//     paymentId: 'pay_RAZORPAY_101928',
//     enrolledAt: new Date(Date.now() - 86400000 * 3).toISOString(),
//     status: 'active',
//   },
// ];

// const DEFAULT_STRATEGY_BOOKINGS: StrategySessionBooking[] = [
//   {
//     id: 'sb1',
//     userId: 'student_1',
//     studentName: 'Aarav Patel',
//     studentEmail: 'aarav.student@gmail.com',
//     contactNumber: '+91 91234 56789',
//     attempt: 'CA Inter Sept 2026',
//     date: '2026-08-08',
//     timeSlot: '04:00 PM - 04:45 PM',
//     primaryStruggle: 'Struggling to balance Costing numericals with Audit theory revision.',
//     amountPaid: 799,
//     paymentId: 'pay_RAZORPAY_781239',
//     bookedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//     meetingLink: 'https://meet.google.com/abc-defg-hij',
//     status: 'scheduled',
//   },
// ];

// const DEFAULT_PAYMENTS: Payment[] = [
//   {
//     id: 'pay_1',
//     userId: 'student_1',
//     userName: 'Aarav Patel',
//     userEmail: 'aarav.student@gmail.com',
//     itemType: 'course',
//     itemId: 'c1',
//     itemTitle: 'CA Inter Income Tax & GST - Fastrack Mastery',
//     amount: 1499,
//     razorpayPaymentId: 'pay_RAZORPAY_554123',
//     razorpayOrderId: 'order_RZP_102938',
//     status: 'success',
//     createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
//   },
//   {
//     id: 'pay_2',
//     userId: 'student_1',
//     userName: 'Aarav Patel',
//     userEmail: 'aarav.student@gmail.com',
//     itemType: 'mentorship',
//     itemId: 'm_sept26_both',
//     itemTitle: 'CA Inter Sept 2026 - Both Groups Mentorship',
//     amount: 2000,
//     razorpayPaymentId: 'pay_RAZORPAY_101928',
//     razorpayOrderId: 'order_RZP_881920',
//     status: 'success',
//     createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
//   },
// ];

// const DataContext = createContext<DataContextType | undefined>(undefined);

// export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { user } = useAuth();

//   const [courses, setCourses] = useState<Course[]>([]);

//   const [mentorships, setMentorships] = useState<MentorshipOption[]>(() => {
//     const saved = localStorage.getItem('sneha_mentorships');
//     return saved ? JSON.parse(saved) : INITIAL_MENTORSHIPS;
//   });

//   const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
//     const saved = localStorage.getItem('sneha_testimonials');
//     return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
//   });

//   const [mentorshipEnrollments, setMentorshipEnrollments] = useState<MentorshipEnrollment[]>(() => {
//     const saved = localStorage.getItem('sneha_mentorship_enrollments');
//     return saved ? JSON.parse(saved) : DEFAULT_ENROLLMENTS;
//   });

//   const [strategyBookings, setStrategyBookings] = useState<StrategySessionBooking[]>(() => {
//     const saved = localStorage.getItem('sneha_strategy_bookings');
//     return saved ? JSON.parse(saved) : DEFAULT_STRATEGY_BOOKINGS;
//   });

//   const [payments, setPayments] = useState<Payment[]>(() => {
//     const saved = localStorage.getItem('sneha_payments');
//     return saved ? JSON.parse(saved) : DEFAULT_PAYMENTS;
//   });

//   const [studentPurchases, setStudentPurchases] = useState<UserPurchase>(() => {
//     const saved = localStorage.getItem('sneha_student_purchases');
//     return saved ? JSON.parse(saved) : DEFAULT_PURCHASES;
//   });

//   const [studentProgress, setStudentProgress] = useState<Record<string, StudentProgress>>(() => {
//     const saved = localStorage.getItem('sneha_student_progress');
//     return saved ? JSON.parse(saved) : {
//       c1: {
//         userId: 'student_1',
//         courseId: 'c1',
//         completedVideoIds: ['v1_1'],
//         lastWatchedVideoId: 'v1_1',
//         overallProgressPercentage: 33,
//         updatedAt: new Date().toISOString(),
//       },
//     };
//   });

//   // Sync state to local storage
//   // useEffect(() => {
//   //   localStorage.setItem('sneha_courses', JSON.stringify(courses));
//   // }, [courses]);

//   useEffect(() => {
//     localStorage.setItem('sneha_mentorships', JSON.stringify(mentorships));
//   }, [mentorships]);

//   useEffect(() => {
//     localStorage.setItem('sneha_testimonials', JSON.stringify(testimonials));
//   }, [testimonials]);

//   useEffect(() => {
//     localStorage.setItem('sneha_mentorship_enrollments', JSON.stringify(mentorshipEnrollments));
//   }, [mentorshipEnrollments]);

//   useEffect(() => {
//     localStorage.setItem('sneha_strategy_bookings', JSON.stringify(strategyBookings));
//   }, [strategyBookings]);

//   useEffect(() => {
//     localStorage.setItem('sneha_payments', JSON.stringify(payments));
//   }, [payments]);

//   useEffect(() => {
//     localStorage.setItem('sneha_student_purchases', JSON.stringify(studentPurchases));
//   }, [studentPurchases]);

//   useEffect(() => {
//     localStorage.setItem('sneha_student_progress', JSON.stringify(studentProgress));
//   }, [studentProgress]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, "courses"),
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => {

//           const d = doc.data();

//           return {

//             id: doc.id,

//             title: d.title || "",

//             subject: d.subject || "",

//             category: d.category || "CA Final",

//             group: d.group || "Both Groups",

//             description: d.description || "",

//             longDescription: d.longDescription || "",

//             thumbnail: d.thumbnail || d.image || "",

//             duration: d.duration || "",

//             price: d.price || 0,

//             originalPrice: d.originalPrice || d.price || 0,

//             rating: d.rating || 5,

//             reviewCount: d.reviewCount || 0,

//             chapters: d.chapters || [],

//             isFeatured: d.isFeatured || false,

//           };

//         }) as Course[];

//         setCourses(data);
//       }
//     );

//     return () => unsubscribe();
//   }, []);
//   // Course Checkers
//   const isCoursePurchased = (courseId: string) => {
//     if (user?.role === 'admin') return true;
//     return studentPurchases.courseIds.includes(courseId);
//   };

//   const isMentorshipPurchased = (mentorshipId: string) => {
//     if (user?.role === 'admin') return true;
//     return studentPurchases.mentorshipIds.includes(mentorshipId);
//   };

//   const hasBookedStrategySession = () => {
//     if (user?.role === 'admin') return true;
//     return strategyBookings.some((b) => b.userId === user?.id || b.studentEmail === user?.email);
//   };

//   // Actions
//   const unlockCourse = (courseId: string, paymentInfo: Partial<Payment>) => {
//     const course = courses.find((c) => c.id === courseId);
//     if (!course || !user) return;

//     // 1. Update purchases
//     setStudentPurchases((prev) => ({
//       ...prev,
//       courseIds: Array.from(new Set([...prev.courseIds, courseId])),
//     }));

//     // 2. Record payment
//     const newPayment: Payment = {
//       id: `pay_${Date.now()}`,
//       userId: user.id,
//       userName: user.name,
//       userEmail: user.email,
//       itemType: 'course',
//       itemId: courseId,
//       itemTitle: course.title,
//       amount: course.price,
//       razorpayPaymentId: paymentInfo.razorpayPaymentId || `pay_RZP_${Math.floor(Math.random() * 1000000)}`,
//       razorpayOrderId: paymentInfo.razorpayOrderId || `order_RZP_${Math.floor(Math.random() * 1000000)}`,
//       status: 'success',
//       createdAt: new Date().toISOString(),
//     };
//     setPayments((prev) => [newPayment, ...prev]);

//     // 3. Initialize progress
//     setStudentProgress((prev) => ({
//       ...prev,
//       [courseId]: {
//         userId: user.id,
//         courseId,
//         completedVideoIds: [],
//         lastWatchedVideoId: course.chapters[0]?.videos[0]?.id,
//         overallProgressPercentage: 0,
//         updatedAt: new Date().toISOString(),
//       },
//     }));
//   };

//   const enrollMentorship = (
//     mentorshipId: string,
//     formData: {
//       studentName: string;
//       studentEmail: string;
//       mobile: string;
//       attempt: string;
//       college: string;
//       currentPreparationLevel: string;
//       amountPaid: number;
//       paymentId: string;
//     }
//   ) => {
//     const mentorship = mentorships.find((m) => m.id === mentorshipId);
//     if (!mentorship || !user) return;

//     // Unlock purchase
//     setStudentPurchases((prev) => ({
//       ...prev,
//       mentorshipIds: Array.from(new Set([...prev.mentorshipIds, mentorshipId])),
//     }));

//     const newEnrollment: MentorshipEnrollment = {
//       id: `e_${Date.now()}`,
//       userId: user.id,
//       studentName: formData.studentName || user.name,
//       studentEmail: formData.studentEmail || user.email,
//       mobile: formData.mobile,
//       attempt: formData.attempt,
//       college: formData.college,
//       currentPreparationLevel: formData.currentPreparationLevel,
//       mentorshipId,
//       mentorshipTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
//       amountPaid: formData.amountPaid,
//       paymentId: formData.paymentId,
//       enrolledAt: new Date().toISOString(),
//       status: 'active',
//     };

//     setMentorshipEnrollments((prev) => [newEnrollment, ...prev]);

//     const newPayment: Payment = {
//       id: `pay_${Date.now()}`,
//       userId: user.id,
//       userName: user.name,
//       userEmail: user.email,
//       itemType: 'mentorship',
//       itemId: mentorshipId,
//       itemTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
//       amount: formData.amountPaid,
//       razorpayPaymentId: formData.paymentId,
//       razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
//       status: 'success',
//       createdAt: new Date().toISOString(),
//     };
//     setPayments((prev) => [newPayment, ...prev]);
//   };

//   const bookStrategySession = (bookingData: {
//     studentName: string;
//     studentEmail: string;
//     contactNumber: string;
//     attempt: string;
//     date: string;
//     timeSlot: string;
//     primaryStruggle: string;
//     amountPaid: number;
//     paymentId: string;
//   }) => {
//     if (!user) return;

//     const newBooking: StrategySessionBooking = {
//       id: `sb_${Date.now()}`,
//       userId: user.id,
//       studentName: bookingData.studentName || user.name,
//       studentEmail: bookingData.studentEmail || user.email,
//       contactNumber: bookingData.contactNumber,
//       attempt: bookingData.attempt,
//       date: bookingData.date,
//       timeSlot: bookingData.timeSlot,
//       primaryStruggle: bookingData.primaryStruggle,
//       amountPaid: bookingData.amountPaid,
//       paymentId: bookingData.paymentId,
//       bookedAt: new Date().toISOString(),
//       meetingLink: 'https://meet.google.com/sg-strategy-session',
//       status: 'scheduled',
//     };

//     setStrategyBookings((prev) => [newBooking, ...prev]);

//     setStudentPurchases((prev) => ({
//       ...prev,
//       strategySessionIds: [...prev.strategySessionIds, newBooking.id],
//     }));

//     const newPayment: Payment = {
//       id: `pay_${Date.now()}`,
//       userId: user.id,
//       userName: user.name,
//       userEmail: user.email,
//       itemType: 'strategy_session',
//       itemId: 'strategy_799',
//       itemTitle: '1:1 Personal Strategy Session with Sneha Gupta',
//       amount: bookingData.amountPaid,
//       razorpayPaymentId: bookingData.paymentId,
//       razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
//       status: 'success',
//       createdAt: new Date().toISOString(),
//     };
//     setPayments((prev) => [newPayment, ...prev]);
//   };

//   const markVideoCompleted = (courseId: string, videoId: string) => {
//     if (!user) return;
//     const course = courses.find((c) => c.id === courseId);
//     if (!course) return;

//     let totalVideos = 0;
//     course.chapters.forEach((ch) => (totalVideos += ch.videos.length));

//     const currentProg = studentProgress[courseId] || {
//       userId: user.id,
//       courseId,
//       completedVideoIds: [],
//       overallProgressPercentage: 0,
//       updatedAt: new Date().toISOString(),
//     };

//     const isAlreadyCompleted = currentProg.completedVideoIds.includes(videoId);
//     const updatedVideoIds = isAlreadyCompleted
//       ? currentProg.completedVideoIds.filter((id) => id !== videoId)
//       : [...currentProg.completedVideoIds, videoId];

//     const pct = totalVideos > 0 ? Math.round((updatedVideoIds.length / totalVideos) * 100) : 0;

//     setStudentProgress((prev) => ({
//       ...prev,
//       [courseId]: {
//         ...currentProg,
//         completedVideoIds: updatedVideoIds,
//         lastWatchedVideoId: videoId,
//         overallProgressPercentage: pct,
//         updatedAt: new Date().toISOString(),
//       },
//     }));
//   };

//   const updateLastWatched = (courseId: string, videoId: string) => {
//     if (!user) return;
//     setStudentProgress((prev) => {
//       const existing = prev[courseId] || {
//         userId: user.id,
//         courseId,
//         completedVideoIds: [],
//         overallProgressPercentage: 0,
//         updatedAt: new Date().toISOString(),
//       };
//       return {
//         ...prev,
//         [courseId]: {
//           ...existing,
//           lastWatchedVideoId: videoId,
//           updatedAt: new Date().toISOString(),
//         },
//       };
//     });
//   };

//   // Admin Operations
//   const addCourse = async (
//     newCourseData: Omit<Course, "id" | "rating" | "reviewCount">
//   ) => {
//     try {
//       await addCourseFirestore({
//         ...newCourseData,
//         rating: 5,
//         reviewCount: 0,
//       });
//     } catch (error) {
//       console.error("Error adding course:", error);
//     }
//   };

//   const updateCourse = async (
//     courseId: string,
//     updated: Partial<Course>
//   ) => {
//     try {
//       await updateCourseFirestore(courseId, updated);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteCourse = async (courseId: string) => {
//     try {
//       await deleteCourseFirestore(courseId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addChapterToCourse = async (
//     courseId: string,
//     chapter: Omit<Chapter, "id">
//   ) => {
//     const course = courses.find((c) => c.id === courseId);

//     if (!course) return;

//     const newChapter: Chapter = {
//       ...chapter,
//       id: `ch_${Date.now()}`,
//     };

//     const updatedCourse = {
//       ...course,
//       chapters: [...(course.chapters || []), newChapter],
//     };

//     await updateCourseFirestore(courseId, {
//       chapters: updatedCourse.chapters,
//     });
//   };

//   const updateMentorshipPrice = (id: string, newPrice: number) => {
//     setMentorships((prev) => prev.map((m) => (m.id === id ? { ...m, price: newPrice } : m)));
//   };

//   const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'date'>) => {
//     const newTestimonial: Testimonial = {
//       ...testimonialData,
//       id: `t_${Date.now()}`,
//       date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
//     };
//     setTestimonials((prev) => [newTestimonial, ...prev]);
//   };

//   const deleteTestimonial = (id: string) => {
//     setTestimonials((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <DataContext.Provider
//       value={{
//         courses,
//         mentorships,
//         testimonials,
//         mentorshipEnrollments,
//         strategyBookings,
//         payments,
//         studentPurchases,
//         studentProgress,
//         unlockCourse,
//         enrollMentorship,
//         bookStrategySession,
//         markVideoCompleted,
//         updateLastWatched,
//         addCourse,
//         updateCourse,
//         deleteCourse,
//         addChapterToCourse,
//         updateMentorshipPrice,
//         addTestimonial,
//         deleteTestimonial,
//         isCoursePurchased,
//         isMentorshipPurchased,
//         hasBookedStrategySession,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, arrayUnion, doc, updateDoc, addDoc, query, orderBy, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {
  addCourseFirestore,
  deleteCourseFirestore,
  updateCourseFirestore,
} from '../services/courseService';
import {
  Course,
  MentorshipOption,
  MentorshipEnrollment,
  StrategySessionBooking,
  Testimonial,
  Payment,
  StudentProgress,
  UserPurchase,
  Chapter,
} from '../types';
import {
  INITIAL_MENTORSHIPS,
  INITIAL_TESTIMONIALS,
} from '../data/initialData';
import { useAuth } from './AuthContext';

interface DataContextType {
  courses: Course[];
  coursesLoading: boolean;
  coursesError: string | null;
  mentorships: MentorshipOption[];
  strategySessionPrice: number;
  testimonials: Testimonial[];
  mentorshipEnrollments: MentorshipEnrollment[];
  strategyBookings: StrategySessionBooking[];
  payments: Payment[];
  studentPurchases: UserPurchase;
  studentProgress: Record<string, StudentProgress>;

  // Actions
  unlockCourse: (courseId: string, paymentInfo: Partial<Payment>) => Promise<void>;
  enrollMentorship: (
    mentorshipId: string,
    formData: {
      studentName: string;
      studentEmail: string;
      mobile: string;
      attempt: string;
      college?: string;
      studyTimePerDay: string;
      selectedGroup?: 'Group 1' | 'Group 2';
      currentPreparationLevel: string;
      amountPaid: number;
      paymentId: string;
    }
  ) => Promise<void>;
  bookStrategySession: (bookingData: {
    studentName: string;
    studentEmail: string;
    contactNumber: string;
    attempt: string;
    date: string;
    timeSlot: string;
    primaryStruggle: string;
    amountPaid: number;
    paymentId: string;
  }) => Promise<void>;

  markVideoCompleted: (courseId: string, videoId: string) => void;
  updateLastWatched: (courseId: string, videoId: string) => void;

  // Admin Operations
  addCourse: (course: Omit<Course, 'id' | 'rating' | 'reviewCount'>) => Promise<void>;
  updateCourse: (courseId: string, updated: Partial<Course>) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  addChapterToCourse: (courseId: string, chapter: Omit<Chapter, 'id'>) => Promise<void>;

  updateMentorshipPrice: (id: string, newPrice: number) => Promise<void>;
  updateStrategySessionPrice: (newPrice: number) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  deleteTestimonial: (id: string) => void;

  // Checkers
  isCoursePurchased: (courseId: string) => boolean;
  isMentorshipPurchased: (mentorshipId: string) => boolean;
  hasBookedStrategySession: () => boolean;
}

const DEFAULT_PURCHASES: UserPurchase = {
  userId: 'student_1',
  courseIds: [],
  mentorshipIds: [],
  strategySessionIds: [],
};

const DEFAULT_ENROLLMENTS: MentorshipEnrollment[] = [];
const DEFAULT_STRATEGY_BOOKINGS: StrategySessionBooking[] = [];
const DEFAULT_PAYMENTS: Payment[] = [];
const DEFAULT_PROGRESS: Record<string, StudentProgress> = {};

/**
 * Reads a JSON value from localStorage safely.
 * A previous version of this file called JSON.parse() directly on whatever
 * was in localStorage. If that value was ever missing, malformed, or from an
 * older/incompatible app version, JSON.parse() throws, and because this runs
 * inside useState()'s lazy initializer, the throw happens during render and
 * takes down the whole app (the "unstable" white-screen behaviour). This
 * helper guarantees we always fall back to a safe default instead of crashing.
 */
function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved) as T;
  } catch (err) {
    console.error(`DataContext: failed to parse localStorage key "${key}", using default.`, err);
    return fallback;
  }
}

/** Writes a JSON value to localStorage safely (private/incognito mode, quota errors, etc. won't crash the app). */
function writeLocalStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`DataContext: failed to save localStorage key "${key}".`, err);
  }
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  // Mentorship programs live in Firestore now (not localStorage) — same
  // reasoning as payments: an admin editing the price on one device needs
  // that change to show up for every student, on every device,
  // immediately. See the live-sync effect further down.
  const [mentorships, setMentorships] = useState<MentorshipOption[]>([]);

  // The 1:1 strategy session has a single shared price, stored in a
  // `settings/strategySession` Firestore doc for the same reason.
  const [strategySessionPrice, setStrategySessionPrice] = useState<number>(799);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    readLocalStorage('sneha_testimonials', INITIAL_TESTIMONIALS)
  );

  // Mentorship enrollments & strategy bookings hold a student's contact
  // details (name, mobile, college, etc.) -- same reasoning as payments:
  // an admin on any device needs to see these, not just the browser where
  // the student enrolled. See the admin-only subscriptions further down.
  const [mentorshipEnrollments, setMentorshipEnrollments] = useState<MentorshipEnrollment[]>([]);
  const [strategyBookings, setStrategyBookings] = useState<StrategySessionBooking[]>([]);

  // Payments are NOT kept in localStorage — a payment made on a student's
  // own phone/laptop needs to show up for the admin on a completely
  // different device, so this has to live in Firestore (shared database),
  // not the browser. See the write sites in unlockCourse / enrollMentorship
  // / bookStrategySession below, and the admin-only subscription further
  // down. IMPORTANT: also lock down Firestore Security Rules so only
  // admin accounts can read the `payments` collection — that's configured
  // in the Firebase console, not in this file.
  const [payments, setPayments] = useState<Payment[]>([]);

  const [studentPurchases, setStudentPurchases] = useState<UserPurchase>(() =>
    readLocalStorage('sneha_student_purchases', DEFAULT_PURCHASES)
  );

  const [studentProgress, setStudentProgress] = useState<Record<string, StudentProgress>>(() =>
    readLocalStorage('sneha_student_progress', DEFAULT_PROGRESS)
  );

  // Sync state to localStorage (courses, mentorships, mentorship
  // enrollments, strategy bookings & payments are intentionally excluded:
  // they live in Firestore)
  useEffect(() => {
    writeLocalStorage('sneha_testimonials', testimonials);
  }, [testimonials]);

  // mentorshipEnrollments / strategyBookings sync live from Firestore instead (admin-only subscriptions below).

  // Payments sync live from Firestore instead (admin-only subscription below).

  useEffect(() => {
    writeLocalStorage('sneha_student_purchases', studentPurchases);
  }, [studentPurchases]);

  useEffect(() => {
    writeLocalStorage('sneha_student_progress', studentProgress);
  }, [studentProgress]);

  // Live sync courses from Firestore
  useEffect(() => {
    setCoursesLoading(true);
    setCoursesError(null);

    const unsubscribe = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            title: d.title || '',
            subject: d.subject || '',
            category: d.category || 'CA Final',
            group: d.group || 'Both Groups',
            description: d.description || '',
            longDescription: d.longDescription || '',
            thumbnail: d.thumbnail || d.image || '',
            duration: d.duration || '',
            price: d.price || 0,
            originalPrice: d.originalPrice || d.price || 0,
            rating: d.rating ?? 5,
            reviewCount: d.reviewCount ?? 0,
            chapters: d.chapters || [],
            isFeatured: d.isFeatured || false,
          };
        }) as Course[];

        setCourses(data);
        setCoursesLoading(false);
      },
      (error) => {
        // Previously there was no error callback here at all, so a bad
        // Firestore security rule or a network failure would silently leave
        // `courses` as an empty array forever with no indication why.
        console.error('DataContext: courses onSnapshot failed:', error);
        setCoursesError(error.message);
        setCoursesLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Live sync payments from Firestore -- admin-only, so any admin, on any
  // device, sees every student's payment the moment it happens. Regular
  // students never subscribe to this (they don't need the full list, and
  // Firestore Security Rules should also block them from reading it).
  useEffect(() => {
    if (user?.role !== 'admin') {
      setPayments([]);
      return;
    }

    const unsubscribe = onSnapshot(
      query(collection(db, 'payments'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Payment[];
        setPayments(data);
      },
      (error) => {
        console.error('DataContext: payments onSnapshot failed:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.role]);

  // Live sync mentorship enrollments from Firestore -- admin-only (same
  // reasoning as payments above).
  useEffect(() => {
    if (user?.role !== 'admin') {
      setMentorshipEnrollments([]);
      return;
    }
    const unsubscribe = onSnapshot(
      query(collection(db, 'mentorshipEnrollments'), orderBy('enrolledAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as MentorshipEnrollment[];
        setMentorshipEnrollments(data);
      },
      (error) => {
        console.error('DataContext: mentorshipEnrollments onSnapshot failed:', error);
      }
    );
    return () => unsubscribe();
  }, [user?.role]);

  // Live sync strategy session bookings from Firestore -- admin-only.
  useEffect(() => {
    if (user?.role !== 'admin') {
      setStrategyBookings([]);
      return;
    }
    const unsubscribe = onSnapshot(
      query(collection(db, 'strategyBookings'), orderBy('bookedAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as StrategySessionBooking[];
        setStrategyBookings(data);
      },
      (error) => {
        console.error('DataContext: strategyBookings onSnapshot failed:', error);
      }
    );
    return () => unsubscribe();
  }, [user?.role]);

  // Live sync mentorship programs from Firestore. If the collection is
  // still empty (first run after this migration), an admin's browser
  // auto-seeds it once from the original hardcoded list so there's a
  // shared starting point every device will now see identically.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'mentorships'),
      async (snapshot) => {
        if (snapshot.empty) {
          setMentorships(INITIAL_MENTORSHIPS);
          if (user?.role === 'admin') {
            try {
              await Promise.all(
                INITIAL_MENTORSHIPS.map((m) =>
                  setDoc(doc(db, 'mentorships', m.id), m)
                )
              );
            } catch (error) {
              console.error('Error seeding mentorships:', error);
            }
          }
          return;
        }
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as MentorshipOption[];
        // The program list and all card text come from the code in
        // initialData.ts (so removed programs disappear and new ones appear
        // immediately). Only the prices stay admin-editable via Firestore.
        const merged = INITIAL_MENTORSHIPS.map((base) => {
          const saved = data.find((m) => m.id === base.id);
          return {
            ...base,
            price: typeof saved?.price === 'number' ? saved.price : base.price,
            ...(typeof saved?.originalPrice === 'number' ? { originalPrice: saved.originalPrice } : {}),
          };
        });
        setMentorships(merged);

        // The server verifies prices against the 'mentorships' collection, so
        // any program that has no document yet (e.g. a newly added one) is
        // created the first time an admin opens the site.
        if (user?.role === 'admin') {
          const missing = INITIAL_MENTORSHIPS.filter((base) => !data.some((m) => m.id === base.id));
          if (missing.length > 0) {
            try {
              await Promise.all(missing.map((m) => setDoc(doc(db, 'mentorships', m.id), m)));
            } catch (error) {
              console.error('Error seeding new mentorships:', error);
            }
          }
        }
      },
      (error) => {
        console.error('DataContext: mentorships onSnapshot failed:', error);
        setMentorships(INITIAL_MENTORSHIPS);
      }
    );

    return () => unsubscribe();
  }, [user?.role]);

  // Live sync the shared strategy-session price from Firestore, with the
  // same one-time admin auto-seed if it hasn't been set yet.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'strategySession'),
      async (docSnap) => {
        if (!docSnap.exists()) {
          setStrategySessionPrice(799);
          if (user?.role === 'admin') {
            try {
              await setDoc(doc(db, 'settings', 'strategySession'), { price: 799 });
            } catch (error) {
              console.error('Error seeding strategy session price:', error);
            }
          }
          return;
        }
        setStrategySessionPrice(Number(docSnap.data().price) || 799);
      },
      (error) => {
        console.error('DataContext: strategy session price onSnapshot failed:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.role]);

  // Course Checkers
  // Purchase state lives on the logged-in user's own Firestore doc
  // (`user.purchasedCourseIds`), not in shared localStorage — so an
  // unpurchased/unauthenticated visitor never sees purchased content, and a
  // purchase made on one device/browser is recognized on any device once
  // that same account logs back in.
  const isCoursePurchased = (courseId: string) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return (user.purchasedCourseIds || []).includes(courseId);
  };

  const isMentorshipPurchased = (mentorshipId: string) => {
    if (user?.role === 'admin') return true;
    return studentPurchases.mentorshipIds.includes(mentorshipId);
  };

  const hasBookedStrategySession = () => {
    if (user?.role === 'admin') return true;
    return strategyBookings.some((b) => b.userId === user?.id || b.studentEmail === user?.email);
  };

  // Actions
  const unlockCourse = async (courseId: string, paymentInfo: Partial<Payment>) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !user) return;

    // Persist the unlock on the student's own account in Firestore. This is
    // the actual access-control source of truth (see isCoursePurchased
    // above) — it's only ever reached after RazorpayModal has confirmed a
    // signature-verified payment with our backend.
    try {
      await updateDoc(doc(db, 'users', user.id), {
        purchasedCourseIds: arrayUnion(courseId),
      });
    } catch (error) {
      console.error('Error saving course purchase:', error);
    }

    // Keep a local copy too, purely for the admin "purchases" demo views
    // that already read from studentPurchases elsewhere in this file.
    setStudentPurchases((prev) => ({
      ...prev,
      courseIds: Array.from(new Set([...prev.courseIds, courseId])),
    }));

    const newPayment: Omit<Payment, 'id'> = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      itemType: 'course',
      itemId: courseId,
      itemTitle: course.title,
      amount: course.price,
      razorpayPaymentId: paymentInfo.razorpayPaymentId || `pay_RZP_${Math.floor(Math.random() * 1000000)}`,
      razorpayOrderId: paymentInfo.razorpayOrderId || `order_RZP_${Math.floor(Math.random() * 1000000)}`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, 'payments'), newPayment);
    } catch (error) {
      console.error('Error logging payment:', error);
    }

    setStudentProgress((prev) => ({
      ...prev,
      [courseId]: {
        userId: user.id,
        courseId,
        completedVideoIds: [],
        lastWatchedVideoId: course.chapters[0]?.videos[0]?.id,
        overallProgressPercentage: 0,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const enrollMentorship = async (
    mentorshipId: string,
    formData: {
      studentName: string;
      studentEmail: string;
      mobile: string;
      attempt: string;
      college?: string;
      studyTimePerDay: string;
      selectedGroup?: 'Group 1' | 'Group 2';
      currentPreparationLevel: string;
      amountPaid: number;
      paymentId: string;
    }
  ) => {
    const mentorship = mentorships.find((m) => m.id === mentorshipId);
    if (!mentorship || !user) return;

    setStudentPurchases((prev) => ({
      ...prev,
      mentorshipIds: Array.from(new Set([...prev.mentorshipIds, mentorshipId])),
    }));

    const newEnrollment: Omit<MentorshipEnrollment, 'id'> = {
      userId: user.id,
      studentName: formData.studentName || user.name,
      studentEmail: formData.studentEmail || user.email,
      mobile: formData.mobile,
      attempt: formData.attempt,
      college: formData.college ?? '',
      studyTimePerDay: formData.studyTimePerDay,
      ...(formData.selectedGroup ? { selectedGroup: formData.selectedGroup } : {}),
      currentPreparationLevel: formData.currentPreparationLevel,
      mentorshipId,
      mentorshipTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
      amountPaid: mentorship.price,
      paymentId: formData.paymentId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };

    try {
      await addDoc(collection(db, 'mentorshipEnrollments'), newEnrollment);
    } catch (error) {
      console.error('Error saving mentorship enrollment:', error);
    }

    const newPayment: Omit<Payment, 'id'> = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      itemType: 'mentorship',
      itemId: mentorshipId,
      itemTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
      amount: mentorship.price,
      razorpayPaymentId: formData.paymentId,
      razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, 'payments'), newPayment);
    } catch (error) {
      console.error('Error logging payment:', error);
    }
  };

  const bookStrategySession = async (bookingData: {
    studentName: string;
    studentEmail: string;
    contactNumber: string;
    attempt: string;
    date: string;
    timeSlot: string;
    primaryStruggle: string;
    amountPaid: number;
    paymentId: string;
  }) => {
    if (!user) return;

    const newBooking: Omit<StrategySessionBooking, 'id'> = {
      userId: user.id,
      studentName: bookingData.studentName || user.name,
      studentEmail: bookingData.studentEmail || user.email,
      contactNumber: bookingData.contactNumber,
      attempt: bookingData.attempt,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      primaryStruggle: bookingData.primaryStruggle,
      amountPaid: strategySessionPrice,
      paymentId: bookingData.paymentId,
      bookedAt: new Date().toISOString(),
      meetingLink: 'https://meet.google.com/sg-strategy-session',
      status: 'scheduled',
    };

    let newBookingId = `sb_${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'strategyBookings'), newBooking);
      newBookingId = docRef.id;
    } catch (error) {
      console.error('Error saving strategy booking:', error);
    }

    setStudentPurchases((prev) => ({
      ...prev,
      strategySessionIds: [...prev.strategySessionIds, newBookingId],
    }));

    const newPayment: Omit<Payment, 'id'> = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      itemType: 'strategy_session',
      itemId: 'strategySession',
      itemTitle: '1:1 Personal Strategy Session with Sneha Gupta',
      amount: strategySessionPrice,
      razorpayPaymentId: bookingData.paymentId,
      razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, 'payments'), newPayment);
    } catch (error) {
      console.error('Error logging payment:', error);
    }
  };

  const markVideoCompleted = (courseId: string, videoId: string) => {
    if (!user) return;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    let totalVideos = 0;
    course.chapters.forEach((ch) => (totalVideos += ch.videos.length));

    const currentProg = studentProgress[courseId] || {
      userId: user.id,
      courseId,
      completedVideoIds: [],
      overallProgressPercentage: 0,
      updatedAt: new Date().toISOString(),
    };

    const isAlreadyCompleted = currentProg.completedVideoIds.includes(videoId);
    const updatedVideoIds = isAlreadyCompleted
      ? currentProg.completedVideoIds.filter((id) => id !== videoId)
      : [...currentProg.completedVideoIds, videoId];

    const pct = totalVideos > 0 ? Math.round((updatedVideoIds.length / totalVideos) * 100) : 0;

    setStudentProgress((prev) => ({
      ...prev,
      [courseId]: {
        ...currentProg,
        completedVideoIds: updatedVideoIds,
        lastWatchedVideoId: videoId,
        overallProgressPercentage: pct,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const updateLastWatched = (courseId: string, videoId: string) => {
    if (!user) return;
    setStudentProgress((prev) => {
      const existing = prev[courseId] || {
        userId: user.id,
        courseId,
        completedVideoIds: [],
        overallProgressPercentage: 0,
        updatedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [courseId]: {
          ...existing,
          lastWatchedVideoId: videoId,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Admin Operations
  const addCourse = async (newCourseData: Omit<Course, 'id' | 'rating' | 'reviewCount'>) => {
    try {
      await addCourseFirestore({
        ...newCourseData,
        rating: 5,
        reviewCount: 0,
      });
    } catch (error) {
      console.error('Error adding course:', error);
      throw error instanceof Error ? error : new Error('Failed to add course.');
    }
  };

  const updateCourse = async (courseId: string, updated: Partial<Course>) => {
    try {
      await updateCourseFirestore(courseId, updated);
    } catch (error) {
      console.error('Error updating course:', error);
      throw error instanceof Error ? error : new Error('Failed to update course.');
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await deleteCourseFirestore(courseId);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error instanceof Error ? error : new Error('Failed to delete course.');
    }
  };

  const addChapterToCourse = async (
    courseId: string,
    chapter: Omit<Chapter, 'id'>
  ) => {
    const newChapter: Chapter = {
      ...chapter,
      id: `ch_${Date.now()}`,
    };

    try {
      await updateCourseFirestore(courseId, {
        chapters: arrayUnion(newChapter),
      });

      console.log("✅ Chapter successfully added to Firestore:", newChapter);
    } catch (error) {
      console.error("❌ Error adding chapter:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to add chapter.");
    }
  };

  const updateMentorshipPrice = async (id: string, newPrice: number) => {
    // Firestore is the source of truth now -- the onSnapshot listener above
    // will update local `mentorships` state once this write lands, so
    // every admin/student sees the new price, not just this browser.
    try {
      await setDoc(doc(db, 'mentorships', id), { price: newPrice }, { merge: true });
    } catch (error) {
      console.error('Error updating mentorship price:', error);
    }
  };

  const updateStrategySessionPrice = async (newPrice: number) => {
    try {
      await setDoc(doc(db, 'settings', 'strategySession'), { price: newPrice }, { merge: true });
    } catch (error) {
      console.error('Error updating strategy session price:', error);
    }
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: `t_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        courses,
        coursesLoading,
        coursesError,
        mentorships,
        strategySessionPrice,
        testimonials,
        mentorshipEnrollments,
        strategyBookings,
        payments,
        studentPurchases,
        studentProgress,
        unlockCourse,
        enrollMentorship,
        bookStrategySession,
        markVideoCompleted,
        updateLastWatched,
        addCourse,
        updateCourse,
        deleteCourse,
        addChapterToCourse,
        updateMentorshipPrice,
        updateStrategySessionPrice,
        addTestimonial,
        deleteTestimonial,
        isCoursePurchased,
        isMentorshipPurchased,
        hasBookedStrategySession,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
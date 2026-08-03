import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Course,
  MentorshipOption,
  MentorshipEnrollment,
  StrategySessionBooking,
  Testimonial,
  Payment,
  StudentProgress,
  UserPurchase,
  Video,
  PDFResource,
  Chapter,
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_MENTORSHIPS,
  INITIAL_TESTIMONIALS,
} from '../data/initialData';
import { useAuth } from './AuthContext';

interface DataContextType {
  courses: Course[];
  mentorships: MentorshipOption[];
  testimonials: Testimonial[];
  mentorshipEnrollments: MentorshipEnrollment[];
  strategyBookings: StrategySessionBooking[];
  payments: Payment[];
  studentPurchases: UserPurchase;
  studentProgress: Record<string, StudentProgress>;
  
  // Actions
  unlockCourse: (courseId: string, paymentInfo: Partial<Payment>) => void;
  enrollMentorship: (
    mentorshipId: string,
    formData: {
      studentName: string;
      studentEmail: string;
      mobile: string;
      attempt: string;
      college: string;
      currentPreparationLevel: string;
      amountPaid: number;
      paymentId: string;
    }
  ) => void;
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
  }) => void;
  
  markVideoCompleted: (courseId: string, videoId: string) => void;
  updateLastWatched: (courseId: string, videoId: string) => void;
  
  // Admin Operations
  addCourse: (course: Omit<Course, 'id' | 'rating' | 'reviewCount'>) => void;
  updateCourse: (courseId: string, updated: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  addChapterToCourse: (courseId: string, chapter: Omit<Chapter, 'id'>) => void;
  
  updateMentorshipPrice: (id: string, newPrice: number) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  deleteTestimonial: (id: string) => void;
  
  // Checkers
  isCoursePurchased: (courseId: string) => boolean;
  isMentorshipPurchased: (mentorshipId: string) => boolean;
  hasBookedStrategySession: () => boolean;
}

const DEFAULT_PURCHASES: UserPurchase = {
  userId: 'student_1',
  courseIds: ['c1'], // Default unlocked 1 course for immediate testing
  mentorshipIds: ['m_sept26_both'], // Default unlocked 1 mentorship for testing
  strategySessionIds: [],
};

const DEFAULT_ENROLLMENTS: MentorshipEnrollment[] = [
  {
    id: 'e1',
    userId: 'student_1',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.student@gmail.com',
    mobile: '+91 91234 56789',
    attempt: 'CA Inter Sept 2026',
    college: 'HR College of Commerce',
    currentPreparationLevel: '50% Syllabus Complete',
    mentorshipId: 'm_sept26_both',
    mentorshipTitle: 'CA Inter Sept 2026 - Both Groups Mentorship',
    amountPaid: 2000,
    paymentId: 'pay_RAZORPAY_101928',
    enrolledAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: 'active',
  },
];

const DEFAULT_STRATEGY_BOOKINGS: StrategySessionBooking[] = [
  {
    id: 'sb1',
    userId: 'student_1',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.student@gmail.com',
    contactNumber: '+91 91234 56789',
    attempt: 'CA Inter Sept 2026',
    date: '2026-08-08',
    timeSlot: '04:00 PM - 04:45 PM',
    primaryStruggle: 'Struggling to balance Costing numericals with Audit theory revision.',
    amountPaid: 799,
    paymentId: 'pay_RAZORPAY_781239',
    bookedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
  },
];

const DEFAULT_PAYMENTS: Payment[] = [
  {
    id: 'pay_1',
    userId: 'student_1',
    userName: 'Aarav Patel',
    userEmail: 'aarav.student@gmail.com',
    itemType: 'course',
    itemId: 'c1',
    itemTitle: 'CA Inter Income Tax & GST - Fastrack Mastery',
    amount: 1499,
    razorpayPaymentId: 'pay_RAZORPAY_554123',
    razorpayOrderId: 'order_RZP_102938',
    status: 'success',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'pay_2',
    userId: 'student_1',
    userName: 'Aarav Patel',
    userEmail: 'aarav.student@gmail.com',
    itemType: 'mentorship',
    itemId: 'm_sept26_both',
    itemTitle: 'CA Inter Sept 2026 - Both Groups Mentorship',
    amount: 2000,
    razorpayPaymentId: 'pay_RAZORPAY_101928',
    razorpayOrderId: 'order_RZP_881920',
    status: 'success',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('sneha_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [mentorships, setMentorships] = useState<MentorshipOption[]>(() => {
    const saved = localStorage.getItem('sneha_mentorships');
    return saved ? JSON.parse(saved) : INITIAL_MENTORSHIPS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('sneha_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [mentorshipEnrollments, setMentorshipEnrollments] = useState<MentorshipEnrollment[]>(() => {
    const saved = localStorage.getItem('sneha_mentorship_enrollments');
    return saved ? JSON.parse(saved) : DEFAULT_ENROLLMENTS;
  });

  const [strategyBookings, setStrategyBookings] = useState<StrategySessionBooking[]>(() => {
    const saved = localStorage.getItem('sneha_strategy_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_STRATEGY_BOOKINGS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('sneha_payments');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENTS;
  });

  const [studentPurchases, setStudentPurchases] = useState<UserPurchase>(() => {
    const saved = localStorage.getItem('sneha_student_purchases');
    return saved ? JSON.parse(saved) : DEFAULT_PURCHASES;
  });

  const [studentProgress, setStudentProgress] = useState<Record<string, StudentProgress>>(() => {
    const saved = localStorage.getItem('sneha_student_progress');
    return saved ? JSON.parse(saved) : {
      c1: {
        userId: 'student_1',
        courseId: 'c1',
        completedVideoIds: ['v1_1'],
        lastWatchedVideoId: 'v1_1',
        overallProgressPercentage: 33,
        updatedAt: new Date().toISOString(),
      },
    };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sneha_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('sneha_mentorships', JSON.stringify(mentorships));
  }, [mentorships]);

  useEffect(() => {
    localStorage.setItem('sneha_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('sneha_mentorship_enrollments', JSON.stringify(mentorshipEnrollments));
  }, [mentorshipEnrollments]);

  useEffect(() => {
    localStorage.setItem('sneha_strategy_bookings', JSON.stringify(strategyBookings));
  }, [strategyBookings]);

  useEffect(() => {
    localStorage.setItem('sneha_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('sneha_student_purchases', JSON.stringify(studentPurchases));
  }, [studentPurchases]);

  useEffect(() => {
    localStorage.setItem('sneha_student_progress', JSON.stringify(studentProgress));
  }, [studentProgress]);

  // Course Checkers
  const isCoursePurchased = (courseId: string) => {
    if (user?.role === 'admin') return true;
    return studentPurchases.courseIds.includes(courseId);
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
  const unlockCourse = (courseId: string, paymentInfo: Partial<Payment>) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !user) return;

    // 1. Update purchases
    setStudentPurchases((prev) => ({
      ...prev,
      courseIds: Array.from(new Set([...prev.courseIds, courseId])),
    }));

    // 2. Record payment
    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
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
    setPayments((prev) => [newPayment, ...prev]);

    // 3. Initialize progress
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

  const enrollMentorship = (
    mentorshipId: string,
    formData: {
      studentName: string;
      studentEmail: string;
      mobile: string;
      attempt: string;
      college: string;
      currentPreparationLevel: string;
      amountPaid: number;
      paymentId: string;
    }
  ) => {
    const mentorship = mentorships.find((m) => m.id === mentorshipId);
    if (!mentorship || !user) return;

    // Unlock purchase
    setStudentPurchases((prev) => ({
      ...prev,
      mentorshipIds: Array.from(new Set([...prev.mentorshipIds, mentorshipId])),
    }));

    const newEnrollment: MentorshipEnrollment = {
      id: `e_${Date.now()}`,
      userId: user.id,
      studentName: formData.studentName || user.name,
      studentEmail: formData.studentEmail || user.email,
      mobile: formData.mobile,
      attempt: formData.attempt,
      college: formData.college,
      currentPreparationLevel: formData.currentPreparationLevel,
      mentorshipId,
      mentorshipTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
      amountPaid: formData.amountPaid,
      paymentId: formData.paymentId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
    };

    setMentorshipEnrollments((prev) => [newEnrollment, ...prev]);

    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      itemType: 'mentorship',
      itemId: mentorshipId,
      itemTitle: `${mentorship.examTerm} - ${mentorship.groupType}`,
      amount: formData.amountPaid,
      razorpayPaymentId: formData.paymentId,
      razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    setPayments((prev) => [newPayment, ...prev]);
  };

  const bookStrategySession = (bookingData: {
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

    const newBooking: StrategySessionBooking = {
      id: `sb_${Date.now()}`,
      userId: user.id,
      studentName: bookingData.studentName || user.name,
      studentEmail: bookingData.studentEmail || user.email,
      contactNumber: bookingData.contactNumber,
      attempt: bookingData.attempt,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      primaryStruggle: bookingData.primaryStruggle,
      amountPaid: bookingData.amountPaid,
      paymentId: bookingData.paymentId,
      bookedAt: new Date().toISOString(),
      meetingLink: 'https://meet.google.com/sg-strategy-session',
      status: 'scheduled',
    };

    setStrategyBookings((prev) => [newBooking, ...prev]);

    setStudentPurchases((prev) => ({
      ...prev,
      strategySessionIds: [...prev.strategySessionIds, newBooking.id],
    }));

    const newPayment: Payment = {
      id: `pay_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      itemType: 'strategy_session',
      itemId: 'strategy_799',
      itemTitle: '1:1 Personal Strategy Session with Sneha Gupta',
      amount: bookingData.amountPaid,
      razorpayPaymentId: bookingData.paymentId,
      razorpayOrderId: `order_RZP_${Math.floor(Math.random() * 1000000)}`,
      status: 'success',
      createdAt: new Date().toISOString(),
    };
    setPayments((prev) => [newPayment, ...prev]);
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
  const addCourse = (newCourseData: Omit<Course, 'id' | 'rating' | 'reviewCount'>) => {
    const newCourse: Course = {
      ...newCourseData,
      id: `c_${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (courseId: string, updated: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, ...updated } : c)));
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const addChapterToCourse = (courseId: string, chapter: Omit<Chapter, 'id'>) => {
    const newChap: Chapter = {
      ...chapter,
      id: `ch_${Date.now()}`,
    };
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            chapters: [...c.chapters, newChap],
          };
        }
        return c;
      })
    );
  };

  const updateMentorshipPrice = (id: string, newPrice: number) => {
    setMentorships((prev) => prev.map((m) => (m.id === id ? { ...m, price: newPrice } : m)));
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
        mentorships,
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

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  attempt?: string;
  college?: string;
  preparationLevel?: string;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview?: boolean;
  order: number;
}

export interface PDFResource {
  id: string;
  title: string;
  type: 'notes' | 'question_bank';
  fileUrl: string;
  pageCount?: number;
  sizeMb?: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  pdfs: PDFResource[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  category: 'CA Inter' | 'CA Final';
  group: 'Group 1' | 'Group 2' | 'Both Groups';
  description: string;
  longDescription: string;
  thumbnail: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  chapters: Chapter[];
  isFeatured?: boolean;
}

export interface MentorshipOption {
  id: string;
  examTerm: 'CA Inter Sept 2026' | 'CA Inter Jan 2027';
  groupType: 'Single Group' | 'Both Groups';
  price: number;
  originalPrice: number;
  description: string;
  benefits: string[];
  weeklyPlan: { week: string; topic: string; goal: string }[];
}

export interface MentorshipEnrollment {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  mobile: string;
  attempt: string;
  college: string;
  currentPreparationLevel: string;
  mentorshipId: string;
  mentorshipTitle: string;
  amountPaid: number;
  paymentId: string;
  enrolledAt: string;
  status: 'active' | 'completed';
}

export interface StrategySessionBooking {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  contactNumber: string;
  attempt: string;
  date: string;
  timeSlot: string;
  primaryStruggle: string;
  amountPaid: number;
  paymentId: string;
  bookedAt: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Testimonial {
  id: string;
  studentName: string;
  studentAttempt: string;
  examScore?: string;
  rating: number;
  reviewText: string;
  avatarUrl?: string;
  whatsappScreenshotUrl?: string;
  marksheetUrl?: string;
  verifiedStudent: boolean;
  date: string;
}

export interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  itemType: 'course' | 'mentorship' | 'strategy_session';
  itemId: string;
  itemTitle: string;
  amount: number;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  status: 'success' | 'failed';
  createdAt: string;
}

export interface StudentProgress {
  userId: string;
  courseId: string;
  completedVideoIds: string[];
  lastWatchedVideoId?: string;
  lastWatchedTimestamp?: number;
  overallProgressPercentage: number;
  updatedAt: string;
}

export interface UserPurchase {
  userId: string;
  courseIds: string[];
  mentorshipIds: string[];
  strategySessionIds: string[];
}

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
  examTerm: 'CA Foundation Jan 2027' | 'CA Inter Jan 2027';
  groupType: 'Single Group' | 'Both Groups' | 'All 4 Subjects';
  /** Optional bold heading shown on the card instead of groupType. */
  title?: string;
  price: number;
  /** Optional. Strikethrough price is shown only when this is higher than price. */
  originalPrice?: number;
  description: string;
  /** Optional validity note shown under the benefits. */
  validity?: string;
  benefits: string[];
  weeklyPlan: { week: string; topic: string; goal: string }[];
  /** Optional. When present, the mentorship card shows this block instead of the weekly blueprint. */
  customPlan?: { title: string; before: string; bold: string; after: string };
}

export interface MentorshipEnrollment {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  mobile: string;
  attempt: string;
  college: string;
  /** Available study time per day, e.g. "4-6 hrs". */
  studyTimePerDay?: string;
  /** Only for Single Group mentorships: which group the student chose. */
  selectedGroup?: 'Group 1' | 'Group 2';
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

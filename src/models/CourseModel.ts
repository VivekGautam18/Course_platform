import { Course } from "../types";

export const createCourse = (
  data: Partial<Course>
): Course => ({
  id: data.id ?? "",

  title: data.title ?? "",
  subject: data.subject ?? "",

  category: data.category ?? "CA Final",

  group: data.group ?? "Both Groups",

  description: data.description ?? "",

  longDescription: data.longDescription ?? "",

  thumbnail: data.thumbnail ?? "",

  duration: data.duration ?? "",

  price: data.price ?? 0,

  originalPrice: data.originalPrice ?? 0,

  rating: data.rating ?? 5,

  reviewCount: data.reviewCount ?? 0,

  chapters: data.chapters ?? [],

  isFeatured: data.isFeatured ?? false,
});
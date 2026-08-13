export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  isPublished: boolean;
  createdAt?: any;
}


export interface Shop {
  id: number;
  name: string;
  address: string;
  email: string;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  created_at: Date;
  updated_at: Date;
}
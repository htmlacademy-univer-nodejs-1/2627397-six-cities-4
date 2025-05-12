export interface CreateOfferDto {
  title: string;
  description: string;
  price: number;
  type: 'apartment' | 'house' | 'room' | 'hotel';
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  createdAt: string;
  city: string;
  previewImage: string;
  images: string[];
  goods: string[];
  bedrooms: number;
  maxAdults: number;
  host: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  commentCount: number;
  latitude: number;
  longitude: number;
}

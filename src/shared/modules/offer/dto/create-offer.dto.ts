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
  };
  commentCount: number;
  latitude: number;
  longitude: number;
}

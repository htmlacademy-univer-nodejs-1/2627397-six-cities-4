export interface UpdateOfferDto {
  id: any;
  title?: string;
  description?: string;
  city?: string;
  previewImage?: string;
  images?: string[];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  type?: string;
  bedrooms?: number;
  maxAdults?: number;
  price?: number;
  goods?: string[];
  latitude?: number;
  longitude?: number;
}

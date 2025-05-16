export interface OffersData {
  titles: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  types: string[];
  goods: string[];
  emails: string[];
  images: {
    items: string[];
    count: number;
  };
  price: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
    precision: number;
  };
  bedrooms: {
    min: number;
    max: number;
  };
  adults: {
    min: number;
    max: number;
  };
  location: {
    radius: {
      min: number;
      max: number;
    };
    coords: Record<string, [number, number]>;
  };
}

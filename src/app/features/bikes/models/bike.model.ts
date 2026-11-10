export interface BikeModel {
    _id?: string;
  bikeName: string;
  type: string;
  pricePerHour?: number;
  pricePerDay?: number;
  available?: boolean;
  description?: string;
  image?: string;
  colour?: string;
  brand?: string;
}

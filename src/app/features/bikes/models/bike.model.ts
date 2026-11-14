export interface Bike {
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
export interface CreateBikeDto {
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
export interface UpdateBikeDto {
  bikeName?: string;
  type?: string;
  pricePerHour?: number;
  pricePerDay?: number;
  available?: boolean;
  description?: string;
  image?: string;
  colour?: string;
  brand?: string;
}
export interface Bike {
    _id?: string;
  bikeName: string;
  type: string;
  pricePerHour?: number;
  pricePerDay?: number;
  available?: boolean;
  description?: string;
  image?: string;
  colour?: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'black' | 'white' |
   'grey' | 'silver' | 'purple' | 'pink' | 'brown' | 'gold';
   brand?: 'Trek' | 'Giant' | 'Specialized' | 'Cannondale' | 'Scott' | 'Cube' | 
   'Merida' | 'Bianchi' | 'Canyon' | 'Orbea' | 'Santa Cruz' | 'Raleigh' | 'Brompton' | 'GT' | 'Norco';
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
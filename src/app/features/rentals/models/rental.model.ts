export interface Rental {
    _id: string;
    bike: string;
    bikeName: string;
    customerName: string;
    contactPhone: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: boolean;
    customerNotes?: string;
  }
  
  export interface CreateRentalDto {
    bike: string;
    bikeName: string;
    customerName: string;
    contactPhone: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: boolean;
    customerNotes?: string;
  }
export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'staff';
  }
  
  export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'staff';
  }
  
  export interface UpdateUserDto {
    name?: string;
    email?: string;
  }
  //Update where needed, need to decide on what to include
  //Update express backend sending back hashed passwords or sending back passwords at all
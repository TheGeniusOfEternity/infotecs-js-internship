export interface UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
  }
}
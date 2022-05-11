export type User = {
  // Account informations
  id: number;
  email: string;
  password: string;
  confirmed: boolean;
  role: {
    id: number;
    name: string;
    type: string;
  };

  // User informations
  username: string;
  firstname: string;
  lastname: string;
  gender: 'M' | 'W' | '';
  phoneNumber: string;
  birthDate: Date;
  address: string;
  postalCode: string;
  city: string;
};

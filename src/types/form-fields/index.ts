export type RegisterFormFields = {
  username: string;
  email: string;
  password: string;
};

export type LoginFormFields = {
  email: string;
  password: string;
};

export type ProfileFormFields = {
  id: number;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

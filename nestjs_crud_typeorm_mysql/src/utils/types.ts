export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};

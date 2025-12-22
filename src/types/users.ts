import { generateEmail } from "../utils/random.data";

export type User = {
  username: string;
  password: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
  pid: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const validUser: User = {
  username: "playwright@test.com",
  password: "test123456",
};

export const invalidUserBlankUsername: User = {
  username: "",
  password: "test123456",
};

export const userInvalidPassword: User = {
  username: "playwright@test.com",
  password: "wrongpassword",
};

export const getValidRegisterUser = (): RegisterUser => ({
  email: generateEmail(),
  password: validUser.password,
  confirmPassword: validUser.password,
  pid: "123456789",
});

export const validChangePasswordData: ChangePasswordData = {
  currentPassword: validUser.password,
  newPassword: "newtest123456",
  confirmPassword: "newtest123456",
};

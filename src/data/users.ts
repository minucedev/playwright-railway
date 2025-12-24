import { generateEmail } from "../utils/random.data";
import type { RegisterUser } from "../pages/register.page";

export type User = {
  username: string;
  password: string;
};

export const valid: User = {
  username: "playwright123@test.com",
  password: "12345678",
};

export const invalidBlankUsername: User = {
  username: "",
  password: "test123456",
};
export const invalidPassword: User = {
  username: "playwright@test.com",
  password: "wrongpassword",
};

export const getValidRegister = (): RegisterUser => ({
  email: generateEmail(),
  password: valid.password,
  confirmPassword: valid.password,
  pid: "123456789",
});

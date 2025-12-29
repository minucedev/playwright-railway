import { generateEmail } from "../utils/random.data";
import type { RegisterUser } from "../types/playwright.types";

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

export const validRegister = (): RegisterUser => ({
  email: generateEmail(),
  password: valid.password,
  confirmPassword: valid.password,
  pid: "123456789",
});

export const mismatchPasswordRegister = (): RegisterUser => ({
  email: generateEmail(),
  password: valid.password,
  confirmPassword: "mismatch123456",
  pid: "123456789",
});

export const emptyPasswordPidRegister = (): RegisterUser => ({
  email: generateEmail(),
  password: "",
  confirmPassword: "",
  pid: "",
});

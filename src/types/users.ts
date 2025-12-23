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

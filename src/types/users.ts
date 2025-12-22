export type User = {
  username: string;
  password: string;
};

export const validUser: User = {
  username: "playwright123@test.com",
  password: "12345678",
};

export const invalidUserBlankUsername: User = {
  username: "",
  password: "test123456",
};
export const userInvalidPassword: User = {
  username: "playwright@test.com",
  password: "wrongpassword",
};

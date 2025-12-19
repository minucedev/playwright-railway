export type User = {
  username: string;
  password: string;
};

export const validUser: User = {
  username: "playwright@test.com",
  password: "test123456",
};

export const invalidUserBlankUsername: User = {
  username: "",
  password: "test123456",
};

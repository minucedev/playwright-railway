export const generateEmail = (): string => {
  const timestamp = Date.now();
  return `testuser${timestamp}@test.com`;
};

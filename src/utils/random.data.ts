export const generateEmail = (): string => {
  const timestamp = Date.now();
  return `testuser${timestamp}@test.com`;
};

export const getRandomDateFromDropdown = async (
  dateSelect: any
): Promise<string> => {
  const options = await dateSelect.locator("option").allTextContents();
  const validDates = options.filter((date: string) => date.trim() !== "");

  if (validDates.length === 0) {
    throw new Error("No valid dates available in dropdown");
  }

  const randomIndex = Math.floor(Math.random() * validDates.length);
  return validDates[randomIndex];
};

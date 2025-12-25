export const Messages = {
  // Success messages
  SUCCESS: {
    REGISTER: "Thank you for registering your account",
    PASSWORD_CHANGED: "Your password has been updated!",
    TICKET_BOOKED: "Ticket Booked Successfully!",
  },

  // Error messages
  ERROR: {
    FORM_ERRORS:
      "There're errors in the form. Please correct the errors and try again.",
    INVALID_CREDENTIALS: "Invalid username or password. Please try again.",
    LOGIN_PROBLEM:
      "There was a problem with your login and/or errors exist in your form.",
  },

  // Validation messages
  VALIDATION: {
    INVALID_PASSWORD_LENGTH: "Invalid password length",
    INVALID_PID: "Invalid ID length",
  },

  // Lockout message template
  getLockoutMessage: (attempts: number) =>
    `You have used ${attempts} out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes.`,
} as const;

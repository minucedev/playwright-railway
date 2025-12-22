export const ROUTES = {
  HOME: "/",
  LOGIN: "/Account/Login",
  REGISTER: "/Account/Register",
  BOOK_TICKET: "/Page/BookTicketPage.cshtml",
  MY_TICKET: "/Page/ManageTicket.cshtml",
  CHANGE_PASSWORD: "/Account/ChangePassword",
  CONTACT: "/Page/Contact.cshtml",
  FAQ: "/Page/FAQ.cshtml",
} as const;

export const MENU_LINKS = {
  LOGIN: "Login",
  REGISTER: "Register",
  BOOK_TICKET: "Book ticket",
  MY_TICKET: "My ticket",
  CHANGE_PASSWORD: "Change password",
  CONTACT: "Contact",
  FAQ: "FAQ",
  LOGOUT: "Log out",
} as const;

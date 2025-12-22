interface PageConfig {
  path: string;
  label?: string;
}

export const pages: Record<string, PageConfig> = {
  HOME: { path: "/" },
  LOGIN: { path: "/Account/Login", label: "Login" },
  REGISTER: { path: "/Account/Register", label: "Register" },
  BOOK_TICKET: { path: "/Page/BookTicketPage.cshtml", label: "Book ticket" },
  MY_TICKET: { path: "/Page/ManageTicket.cshtml", label: "My ticket" },
  CHANGE_PASSWORD: {
    path: "/Account/ChangePassword",
    label: "Change password",
  },
  CONTACT: { path: "/Page/Contact.cshtml", label: "Contact" },
  FAQ: { path: "/Page/FAQ.cshtml", label: "FAQ" },
};

export const menuAction = {
  LOGOUT: "Log out",
} as const;

interface PageConfig {
  path: string;
  label?: string;
}

export const pages: Record<string, PageConfig> = {
  home: { path: "/" },
  login: { path: "/Account/Login", label: "Login" },
  register: { path: "/Account/Register", label: "Register" },
  bookTicket: { path: "/Page/BookTicketPage.cshtml", label: "Book Ticket" },
  myTicket: { path: "/Page/ManageTicket.cshtml", label: "My Ticket" },
  changePassword: {
    path: "/Account/ChangePassword",
    label: "Change Password",
  },
  contact: { path: "/Page/Contact.cshtml", label: "Contact" },
  faq: { path: "/Page/FAQ.cshtml", label: "FAQ" },
};

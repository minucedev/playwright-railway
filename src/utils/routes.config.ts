export enum PageRoute {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  BOOK_TICKET = "bookTicket",
  MY_TICKET = "myTicket",
  CHANGE_PASSWORD = "changePassword",
  TIMETABLE = "timetable",
  CONTACT = "contact",
  FAQ = "faq",
  LOGOUT = "logout",
}

interface PageConfig {
  path?: string;
  label?: string;
}

export const pages: Record<PageRoute, PageConfig> = {
  [PageRoute.HOME]: { path: "/" },
  [PageRoute.LOGIN]: { path: "/Account/Login", label: "Login" },
  [PageRoute.REGISTER]: { path: "/Account/Register", label: "Register" },
  [PageRoute.BOOK_TICKET]: {
    path: "/Page/BookTicketPage.cshtml",
    label: "Book Ticket",
  },
  [PageRoute.MY_TICKET]: {
    path: "/Page/ManageTicket.cshtml",
    label: "My ticket",
  },
  [PageRoute.CHANGE_PASSWORD]: {
    path: "/Account/ChangePassword.cshtml",
    label: "Change Password",
  },
  [PageRoute.TIMETABLE]: {
    path: "/Page/TrainTimeListPage.cshtml",
    label: "Timetable",
  },
  [PageRoute.CONTACT]: { path: "/Page/Contact.cshtml", label: "Contact" },
  [PageRoute.FAQ]: { path: "/Page/FAQ.cshtml", label: "FAQ" },
  [PageRoute.LOGOUT]: { label: "Log out" },
};

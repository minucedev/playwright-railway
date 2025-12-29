export type BookTicketData = {
  date?: string;
  departStation: string;
  arriveStation: string;
  seatType: string;
  ticketAmount: string;
  id?: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
  pid: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

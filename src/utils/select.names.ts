export const SELECT_NAMES = {
  Date: "Date",
  DepartStation: "DepartStation",
  ArriveStation: "ArriveStation",
  SeatType: "SeatType",
  TicketAmount: "TicketAmount",
} as const;

export type SelectName = (typeof SELECT_NAMES)[keyof typeof SELECT_NAMES];

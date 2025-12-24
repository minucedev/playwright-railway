import type { BookTicketData } from "../pages/book.ticket.page";
import { SeatType, DepartStation, ArriveStation } from "../utils/ticket.config";

export const validTicket: BookTicketData = {
  departStation: DepartStation.SAI_GON,
  arriveStation: ArriveStation.NHA_TRANG,
  seatType: SeatType.SOFT_BED_AIR_CONDITIONER,
  ticketAmount: "1",
};

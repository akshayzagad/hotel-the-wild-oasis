/* eslint-disable react/prop-types */
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  dateBookings = [],
  confirmedStays = [],
  numDays = 0,
  cabinCount = 0,
}) {
  const numDateBookings = dateBookings.length;

  const sales = dateBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checking = confirmedStays.length;

  const occupiedNights = confirmedStays?.reduce(
    (acc, stay) => acc + (stay.numNight || 0),
    0
  );

  const totalAvailableNights = numDays * cabinCount;

  const occupation =
    totalAvailableNights > 0 ? occupiedNights / totalAvailableNights : 0;

  //   num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numDateBookings}
      />
      <Stat
        title="sales"
        color="Green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checking}
      />
      <Stat
        title="Occupancy rate"
        color="blue"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

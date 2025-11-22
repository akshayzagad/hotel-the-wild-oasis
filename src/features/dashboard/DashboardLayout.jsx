import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { isLoading, dateBookings } = useRecentBookings();

  const { isLoading: isStaying,numDays, confirmedStays } = useRecentStays();

  const { isLoading: isLoadCabins, getDataOfCabins } = useCabins();

  if (isLoading || isStaying || isLoadCabins) return <Spinner />;

  console.log(numDays);

  return (
    <StyledDashboardLayout>
      <Stats
        dateBookings={dateBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={getDataOfCabins.length}
      />
      <div>Today Activity</div>
      <div>Chart Stay Duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

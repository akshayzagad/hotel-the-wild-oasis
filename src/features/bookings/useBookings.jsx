import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");
  console.log(filterValue);

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // {field:"totalPrice",value:5000,method:"gte"}
  console.log(filter);

  const {
    isLoading,
    data: getDataOfBookings,
    error,
  } = useQuery({
    queryKey: ["booking", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { isLoading, getDataOfBookings, error };
}

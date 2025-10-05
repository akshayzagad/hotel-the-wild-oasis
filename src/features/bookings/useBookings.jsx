import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // {field:"totalPrice",value:5000,method:"gte"}

  //Sort

  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: getDataOfBookings = [], count = 0 } = {},
    error,
  } = useQuery({
    queryKey: ["booking", filter, sortBy,page],
    queryFn: () => getBookings({ filter, sortBy ,page}),
  });
  console.log("getDataOfBookings:", getDataOfBookings);
  console.log("count:", count);
  return { isLoading, getDataOfBookings, error, count };
}

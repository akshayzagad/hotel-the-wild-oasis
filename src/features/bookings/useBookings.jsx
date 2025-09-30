import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const {
    isLoading,
    data: getDataOfBookings,
    error,
  } = useQuery({ queryKey: ["booking"], queryFn: getBookings });
  return { isLoading, getDataOfBookings, error };
}

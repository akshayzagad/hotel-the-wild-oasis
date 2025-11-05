import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser(){
    const {isLoading,data:user} = useQuery({
        queryKey:["Users"],
        queryFn:getCurrentUser,
    });
    return{isLoading, user,isAuthenticated: user?.role === 'authenticated'}
}
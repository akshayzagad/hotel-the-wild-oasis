import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1}Load the authenticated user

  const { user, isLoading, isAuthenticated } = useUser();

  //2}If there no Authenticated user return to the login page

  useEffect(function () {
    if (!isAuthenticated && isLoading) navigate("/login");
  }, [isAuthenticated,isLoading,navigate]);

  //3}while loading , show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4} if there user then render the app

  if(isAuthenticated) return children;
}

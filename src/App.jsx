import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import BooKings from "./pages/BooKings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to={"Dashboard"} />}
            ></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="booKings" element={<BooKings />}></Route>
            <Route path="booKings/:bookingId" element={<Booking />}></Route>
            <Route path="cabins" element={<Cabins />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="users" element={<Users />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center"
       gutter={12} 
       containerStyle={{ margin: "8px" }} 
       toastOptions={{
        success:{
          duration:3000,
        },
        error:{
          duration:5000,
        },
        style:{
          fontSize:'16px',
          maxWidth:'500px',
          padding:"16px 24px",
          backgroundColor:"var(--color-gray-100)",
          color:"var(--color-gray-700)",
        }
       }}
       />
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles"
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import BooKings from "./pages/BooKings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
function App() {
  return (
    <>
    <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
          <Route index element={<Navigate replace to={"Dashboard"} />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="booKings" element={<BooKings />}></Route>
          <Route path="cabins" element={<Cabins />}></Route>
          <Route path="settings" element={<Settings />}></Route>
          <Route path="users" element={<Users />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

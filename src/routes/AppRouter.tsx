import type { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/pages/Register/Register";
import ContactsPage from "../components/pages/ContactsPage/ContactsPage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/pages/Login/Login";

interface AppRouterProps {}

const AppRouter: FunctionComponent<AppRouterProps> = () => {
  return (
    <BrowserRouter basename="/peopledex">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<ContactsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

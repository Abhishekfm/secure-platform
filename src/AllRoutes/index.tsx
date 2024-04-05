import { Route, Routes } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Dashboard from "../pages/Dashboad";
import { APPLICATION_ENDPOINTS } from "../helper/constant";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path={APPLICATION_ENDPOINTS.signUp} element={<SignUpPage />} />
        <Route path={APPLICATION_ENDPOINTS.users} element={<Dashboard />} />
        <Route path={APPLICATION_ENDPOINTS.signIn} element={<SignInPage />} />
      </Routes>
    </>
  );
}

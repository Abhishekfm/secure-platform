import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hook/storeHook";
import { ReactElement } from "react";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { token } = useAppSelector((state) => state.authReducer);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
export default PrivateRoute;

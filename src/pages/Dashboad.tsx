import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import UserListingPage from "../components/UsersListing";
import { useAppSelector } from "../store/hook/storeHook";

export default function Dashboard() {
  const { token } = useAppSelector((state) => state.authReducer);

  if (!token) {
    return <Navigate to="/" />;
  }

  return token ? (
    <>
      <Header />
      <div className="flex gap-2 flex-wrap m-10">
        <UserListingPage />
      </div>
    </>
  ) : (
    <></>
  );
}

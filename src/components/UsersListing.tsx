import { useEffect } from "react";
import { useGetUserListingMutation } from "../store/ApiService/userListing";
import { useAppSelector } from "../store/hook/storeHook";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";

export default function UserListingPage() {
  const [getUserListing, response] = useGetUserListingMutation();
  const { token } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (token) {
      getUserListing({ page: 1 });
    }
  }, [getUserListing, token]);

  return (
    <>
      {token && response?.data?.data ? (
        response?.data?.data?.map((item) => (
          <UserCard
            key={item.id}
            id={item.id}
            email={item.email}
            first_name={item.first_name}
            last_name={item.last_name}
            avatar={item.avatar}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

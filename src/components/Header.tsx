import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/hook/storeHook";
import { deleteToken } from "../store/slice/authSlice";
import { APPLICATION_ENDPOINTS } from "../helper/constant";

export default function Header() {
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(deleteToken());
  };
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={APPLICATION_ENDPOINTS.users} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Secure Platform
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <button
              onClick={logOut}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

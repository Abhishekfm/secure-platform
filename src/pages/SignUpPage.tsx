import { useEffect, useState } from "react";
import { useSignUpMutation } from "../store/ApiService/authService";
import { deleteToken, setToken } from "../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hook/storeHook";
import CredentialForm from "../components/CredentialForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_VALIDATION_SCHEMA } from "../validations/auth.validation";
import { showToast } from "../helper";
import { Link, Navigate } from "react-router-dom";
import { APPLICATION_ENDPOINTS } from "../helper/constant";

export default function SignUpPage() {
  const [signUp, response] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.authReducer);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
    shouldFocusError: true,
  });

  const onSubmitHandler = handleSubmit((bodyData) => {
    signUp(bodyData);
    setBtnDisable(true);
  });

  useEffect(() => {
    if (response.isError) {
      dispatch(deleteToken());
      if ("data" in response.error && "error" in response.error?.data) {
        showToast(response.error?.data?.error as string, "error");
      } else {
        showToast("Register Failed", "error");
      }
      setBtnDisable(false);
    }
    if (response.isSuccess && response?.data) {
      dispatch(setToken(response?.data.token));
      showToast("Registered Successfully", "success");
      setBtnDisable(false);
    }
  }, [dispatch, response]);

  if (token) {
    return <Navigate to={APPLICATION_ENDPOINTS.users} />;
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to={APPLICATION_ENDPOINTS.signUp}
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Secure Platform
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={onSubmitHandler}
              >
                <CredentialForm
                  register={register}
                  errors={errors}
                  getValues={getValues}
                />
                <button
                  className={`w-full text-white p-2 rounded ${
                    btnDisable ? "bg-gray-600" : "bg-blue-600"
                  }`}
                  type="submit"
                  disabled={btnDisable}
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={APPLICATION_ENDPOINTS.signIn}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

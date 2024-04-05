import { FieldErrors } from "react-hook-form";
import Input from "./Input";

export interface FormProps {
  setValue?: any;
  getValues?(name: string): any;
  errors?: FieldErrors;
  register?: any;
  defaultValue?: string | number | null;
  value?: string | number | null;
  onEmailChange?(content: string | number | Date): void;
  onPswdChange?(content: string | number | Date): void;
  externalError?: string;
  disabledEmail?: boolean;
  disabledPswd?: boolean;
}

export default function CredentialForm({
  setValue,
  getValues,
  errors,
  register,
  defaultValue,
  value,
  onEmailChange,
  onPswdChange,
  externalError,
  disabledEmail,
  disabledPswd,
}: FormProps) {
  return (
    <>
      <div>
        <Input
          name="email"
          register={register}
          label="Email"
          errors={errors}
          defaultValue={getValues && getValues("password")}
          type={"email"}
        />
      </div>
      <div>
        <Input
          name="password"
          type={"password"}
          register={register}
          defaultValue={getValues && getValues("password")}
          label="Password"
          errors={errors}
        />
      </div>
      {/* <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div> */}
    </>
  );
}

import { FieldErrors } from "react-hook-form";
import Input from "./Input";

export interface FormProps {
  getValues?(name: string): any;
  errors?: FieldErrors;
  register?: any;
}

export default function CredentialForm({
  getValues,
  errors,
  register,
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
    </>
  );
}

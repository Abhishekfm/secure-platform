import React, { memo, useEffect, useState } from "react";

import EYECLOSE from "../assets/images/eye-fill-close.png";
import EYEOPEN from "../assets/images/eye-fill.svg";
import { FieldErrors } from "react-hook-form";

export interface InputProps {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  errors?: FieldErrors;
  register?: any;
  defaultValue?: string | number | null;
  value?: string | number | null;
  onChange?(content: string | number | Date): void;
  disabled?: boolean;
  isEvent?: boolean;
  isNested?: boolean;
}

const Input = ({
  name,
  label = "",
  type,
  placeholder = "",
  errors,
  register,
  defaultValue,
  value,
  disabled = false,
  onChange,
  isEvent,
  isNested,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputPasswordType, setInputPasswordType] = useState<string>(type);

  useEffect(() => {
    if (type === "password" && showPassword) {
      setInputPasswordType("text");
    } else if (type === "password") {
      setInputPasswordType("password");
    }
  }, [type, showPassword]);

  const getNestedErrorMessage = (errorObject: any, path: string) => {
    const keys = path.split(".");
    let currentObject = errorObject;

    for (const key of keys) {
      currentObject = currentObject[key];
      if (!currentObject) {
        break;
      }
    }

    return currentObject?.message?.toString() || "";
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white relative">
        {label}:
        <input
          name={name}
          type={type === "password" ? inputPasswordType : type}
          disabled={disabled}
          placeholder={placeholder}
          {...(register && register(name))}
          {...(onChange && {
            onChange: (e: any) => {
              const valueToPass = isEvent ? e : e.target.value;
              if (onChange) {
                onChange(valueToPass);
              }
            },
          })}
          {...(!value &&
            defaultValue !== undefined && { defaultValue: defaultValue })}
          {...(value !== undefined && { value: value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {type === "password" && (
          <img
            src={showPassword ? EYEOPEN : EYECLOSE}
            alt="Show"
            className="absolute icon top-[32px] right-[10px]"
            width={18}
            height={18}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </label>
      {isNested && errors ? (
        <p className="text-red-500 mt-2">
          {getNestedErrorMessage(errors, name)}
        </p>
      ) : (
        errors &&
        errors[name] && (
          <p className="text-red-500 mt-2">
            {errors[name]?.message?.toString()}
          </p>
        )
      )}
    </>
  );
};

export default memo(Input);

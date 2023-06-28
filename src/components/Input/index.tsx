"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IInput {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  disable?: boolean;
  errors: FieldErrors;
}
export default function Input(props: IInput) {
  const {
    label,
    id,
    type = "text",
    required,
    placeholder,
    register,
    disable,
    errors,
  } = props;
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm">{label}</label>
      <input
        className={clsx(
          "form-input block w-full rounded-md py-1.5 text-gray-900 shadow-sm border-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset placeholder:text-gray-400",
          disable && "opacity-50 cursor-default",
          errors[id] && "focus:ring-rose-500"
        )}
        placeholder={placeholder}
        type={type}
        disabled={disable}
        autoComplete={id}
        {...register(id, { required })}
      ></input>
    </div>
  );
}

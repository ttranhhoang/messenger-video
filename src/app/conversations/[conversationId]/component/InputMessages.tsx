"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IInputMessages {
  placeholder?: string;
  id: string;
  type?: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const InputMessages = (props: IInputMessages) => {
  const { id, type, errors, register, required, placeholder } = props;
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        type={type}
        className="w-full rounded-full text-black text-sm font-normal bg-neutral-100 px-4 py-2 focus:outline-none placeholder:text-sm placeholder:font-medium"
      />
    </div>
  );
};

export default InputMessages;

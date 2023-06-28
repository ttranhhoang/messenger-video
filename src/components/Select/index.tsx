"use client";
import React from "react";
import ReactSelect from "react-select";

interface ISelect {
  label: string;
  value?: Record<string, any>;
  disable?: boolean;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
}
const Select = (props: ISelect) => {
  const { label, value, disable, onChange, options } = props;
  return (
    <div className="z-[100]">
      <label className="block text-sm leading-7 font-medium text-gray-900">
        {label}
      </label>
      <ReactSelect
        isMulti
        isDisabled={disable}
        options={options}
        onChange={onChange}
        value={value}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        classNames={{
          control: () => "text-sm",
        }}
      />
    </div>
  );
};

export default Select;

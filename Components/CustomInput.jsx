import React from "react";

const CustomInput = ({ placeholder, name, id, type, handleChange, label }) => {
  return (
    <div className=" flex flex-col gap-1.5">
      <label className=" font-mont font-semibold text-sm"> {label} </label>
      <input
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
        onChange={handleChange}
        className="input"
      />
    </div>
  );
};

export default CustomInput;

import React from "react";

const FormInput = ({
  label,
  id,
  name,
  type,
  onChange,
  onBlur,
  value,
  error,
  options,
  required,
  placeholder,
}) => {
  return (
    <div className="form-input-ad">
      <label htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {type === "select" ? (
        <select
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ""} // Set an empty string as the default value
          placeholder={placeholder}
        >
          <option value="" disabled hidden>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
        />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormInput;

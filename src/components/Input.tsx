import React from "react";

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  className?: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  size?: string;
  error?: boolean;
  inputRef?: any;
};

const Input = (props: Props) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    name,
    type,
    className,
    id,
    required,
    disabled,
    autoComplete,
    maxLength,
    size,
    error,
    inputRef,
  } = props;

  const defaultClassName =
    "border-purple-300 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-white " +
    size;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 mt-4 font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        // ref={(element) => (inputRef.current.firstName = element)}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={className || defaultClassName}
        id={id}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
      {error && (
        <p className="text-red-500 mt-1">O campo {label} é obrigatório.</p>
      )}
    </div>
  );
};

export default Input;

import React from "react";

type Props = {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  className?: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  error?: boolean;
  inputRef?: React.Ref<HTMLTextAreaElement>;
};

const TextArea = (props: Props) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    name,
    className,
    id,
    required,
    disabled,
    maxLength,
    rows,
    error,
    inputRef,
  } = props;

  const defaultClassName =
    "border-purple-300 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-white";

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="mb-1 mt-4 font-semibold">
          {label}
        </label>
      )}
      <textarea
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
        maxLength={maxLength}
        rows={rows || 4} // Número de linhas padrão é 4, pode ser substituído pela prop rows
      />
      {error && (
        <p className="text-red-500 mt-1">O campo {label} é obrigatório.</p>
      )}
    </div>
  );
};

export default TextArea;

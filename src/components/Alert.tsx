import React from "react";

type Props = {
  type: "success" | "error" | "warning";
  message: string;
};

const Alert = ({ type, message }: Props) => {
  let bgColor, textColor, icon;
  if (type === "success") {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (type === "error") {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else if (type === "warning") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-700";
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938-4H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2h-1.062M8 19h8M12 3v2m0 10v2" />
      </svg>
    );
  }

  return (
    <div className={`mb-3 inline-flex w-full items-center rounded-lg ${bgColor} px-6 py-5 text-base ${textColor}`} role="alert">
      <span className="mr-2">{icon}</span>
      {message}
    </div>
  );
};

export default Alert;

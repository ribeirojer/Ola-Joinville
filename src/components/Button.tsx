import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  testId?: string;
  title?: string;
  id?: string;
  outline?: boolean;
  ghost?: boolean;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
};

const Button = (props: Props) => {
  const getVariantClasses = () => {
    switch (props.variant) {
      case "success":
        return "bg-green-500 text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]";
      case "danger":
        return "bg-red-500 text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]";
      case "warning":
        return "bg-yellow-500 text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]";
      case "info":
        return "bg-blue-500 text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]";
      case "light":
        return "bg-gray-200 text-gray-800 shadow-[0_4px_9px_-4px_#cbd5e0] transition duration-150 ease-in-out hover:bg-gray-300 hover:shadow-[0_8px_9px_-4px_rgba(203,213,224,0.3),0_4px_18px_0_rgba(203,213,224,0.2)] focus:bg-gray-300 focus:shadow-[0_8px_9px_-4px_rgba(203,213,224,0.3),0_4px_18px_0_rgba(203,213,224,0.2)] focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-[0_8px_9px_-4px_rgba(203,213,224,0.3),0_4px_18px_0_rgba(203,213,224,0.2)]";
      case "dark":
        return "bg-gray-800 text-white shadow-[0_4px_9px_-4px_#1f2937] transition duration-150 ease-in-out hover:bg-gray-900 hover:shadow-[0_8px_9px_-4px_rgba(31,41,55,0.3),0_4px_18px_0_rgba(31,41,55,0.2)] focus:bg-gray-900 focus:shadow-[0_8px_9px_-4px_rgba(31,41,55,0.3),0_4px_18px_0_rgba(31,41,55,0.2)] focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-[0_8px_9px_-4px_rgba(31,41,55,0.3),0_4px_18px_0_rgba(31,41,55,0.2)]";
      default:
        return "px-4 py-2 rounded-md font-semibold text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50";
    }
  };

  const classes = [
    "px-4 py-2 rounded-md font-semibold",
    getVariantClasses(),
    props.ghost
      ? "bg-transparent hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 focus:ring-opacity-50 text-gray-800"
      : "",
    props.outline
      ? "bg-pink-100 hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
      : "",
    props.outline &&
      "inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10",
  ]
    .filter((c) => c)
    .join(" ");

  const title = props.title ? props.title : props.children;

  return (
    <button
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
      data-testid={props.testId}
      title={title as string}
      id={props.id}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps {
  label: string;
  isArrow?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "outline" | "filled";
  fullWidth?: boolean;
  customBg?: string;
  customPY?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  customIcon?: React.ReactNode;
  className?: string;
}

const MyButton: React.FC<ButtonProps> = ({
  isArrow = false,
  label,
  onClick,
  variant = "filled",
  fullWidth,
  customBg,
  customPY,
  type = "button",
  isDisabled = false,
  customIcon,
  className
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      style={{
        ...(customBg ? { backgroundColor: customBg } : {}),
        ...(customPY
          ? { paddingTop: `${customPY} 0`, paddingBottom: `${customPY} 0` }
          : {}),
      }}
      className={cn(
        "px-[18px] py-3 rounded-[10px] text-base font-medium transition-all duration-300 flex items-center justify-center gap-1", className,
        {
          "px-[calc(2rem-1.7px)] py-[calc(0.5rem-1.7px)] border-2 border-primary text-primary":
            variant === "outline",
          "bg-primary text-white hover:bg-teal-700": variant === "filled",
          "w-full": fullWidth,
        }
      )}
    >
      {label}{" "}
      {isArrow && variant === "filled" && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.4489 11.1013C17.1085 11.1013 14.9753 8.9691 14.9753 6.62766V5.66766H13.0553V6.62766C13.0553 8.3307 13.8022 9.92813 14.9744 11.1013H3.12891V13.0213H14.9744C13.8022 14.1944 13.0553 15.7918 13.0553 17.4949V18.4549H14.9753V17.4949C14.9753 15.1534 17.1085 13.0213 19.4489 13.0213H20.4089V11.1013H19.4489Z"
              fill="white"
            />
          </svg>
        </span>
      )}
      {isArrow && variant === "outline" && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.4489 11.1013C17.1085 11.1013 14.9753 8.96916 14.9753 6.62772V5.66772H13.0553V6.62772C13.0553 8.33076 13.8022 9.92819 14.9744 11.1013H3.12891V13.0213H14.9744C13.8022 14.1944 13.0553 15.7919 13.0553 17.4949V18.4549H14.9753V17.4949C14.9753 15.1535 17.1085 13.0213 19.4489 13.0213H20.4089V11.1013H19.4489Z"
              fill="#BB8525"
            />
          </svg>
        </span>
      )}
      {customIcon}
    </button>
  );
};

export default MyButton;

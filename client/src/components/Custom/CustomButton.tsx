import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  icon?: IconProps;
  isSidebarItem?: boolean;
}

export const CustomButton = ({
  type = "button",
  isLoading,
  text,
  isSidebarItem,
  children,
  icon = { path: "", size: 1 },
  ...props
}: Props) => {
  const buttonClasses = classNames({
    "px-3 py-1 rounded-2xl font-medium hover:bg-slightly-dark flex items-center gap-2":
      !isSidebarItem,
    "sidebar-item w-full": isSidebarItem,
  });
  return (
    <>
      <button
        {...props}
        disabled={isLoading}
        className={buttonClasses}
        type={type}
      >
        {icon.path && <Icon {...icon} />}
        <span className={icon.path && "ml-3"}>{text || children}</span>
      </button>
    </>
  );
};

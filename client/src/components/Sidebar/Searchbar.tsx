import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import classNames from "classnames";

type Props = {
  placeholder?: string;
  width?: number;
};

export const Searchbar = ({ width = 320, ...props }: Props) => {
  const widthVariants = {

  }
  const containerClasses = classNames({
    'bg-slightly-dark rounded-xl p-3 flex': true,
  });
  const inputClasses = classNames({
    'ml-2 outline-none bg-transparent placeholder:text-white': true,
    'w-[320px]': width === 320,
    'w-[720px]': width === 720
  })
  return (
    <label className={containerClasses}>
      <Icon path={mdiMagnify} size={1} color="white" />
      <input
        className={inputClasses}
        type="text"
        placeholder={props.placeholder}
        {...props}
      />
    </label>
  );
};

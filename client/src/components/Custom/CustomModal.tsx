import React, { useEffect } from "react";
import classNames from "classnames";
import useModalStore from "@/stores/modal";

type Props = {
  children?: React.ReactNode;
  isVisible: boolean;
  hasCloseIcon?: boolean;
  setVisible: () => void;
};

const CustomModal = ({
  children,
  isVisible,
  setVisible,
  hasCloseIcon,
}: Props) => {
  const modal = classNames({
    fixed: true,
    "top-0 bottom-0 right-0 left-0 hidden": !isVisible,
    "z-[10000] flex top-1/2 left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2 items-center justify-center":
      isVisible,
  });

  const overlay = classNames({
    "fixed top-0 bottom-0 left-0 right-0 w-full h-full backdrop-blur-sm z-[9999] bg-black opacity-20":
      isVisible,
  });

  const { color } = useModalStore();

  useEffect(() => {
    console.log(color);
  }, []);

  return (
    <>
      <div className={modal}>
        {hasCloseIcon && (
          <div className="float-right">
            <button onClick={setVisible}>X</button>
          </div>
        )}
        <div
          style={{ backgroundColor: color }}
          className="p-6 bg-dark border border-slightly-dark rounded-2xl min-w-[250px]"
        >
          {children}
        </div>
      </div>
      <div onClick={setVisible} className={overlay}></div>
    </>
  );
};

export default CustomModal;

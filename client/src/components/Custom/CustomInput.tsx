import { useEffect, useRef } from "react";
type Props = {
  isTextarea?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const CustomInput = ({ isTextarea, type = "text", ...props }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      // Set height
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        32
      )}px`;
    }
  }, [props.value]);
  return (
    <>
      {isTextarea ? (
        <textarea className="input" {...props} ref={textareaRef} />
      ) : (
        <input className="input" type={type} {...props} />
      )}
    </>
  );
};

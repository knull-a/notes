import { useEffect, useRef } from "react";
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
type Props<T> = {
  isTextarea?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  name?: string;
  options?: RegisterOptions;
  register?: UseFormRegister<any>; // temp
  onChange?: any;
};

export function CustomInput<T = any>({
  isTextarea,
  register,
  options,
  type = "text",
  name,
  onChange,
  ...props
}: Props<T>) {
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
        <textarea
          className="input"
          {...props}
          ref={textareaRef}
          {...(register && register(name as string, options))}
        />
      ) : (
        <input
          className="input"
          type={type}
          {...props}
          {...(register && register(name as string, options))}
        />
      )}
    </>
  );
}

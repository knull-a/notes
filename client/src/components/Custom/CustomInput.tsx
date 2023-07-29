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
  return (
    <>
      {isTextarea ? (
        <textarea className="input" {...props} />
      ) : (
        <input className="input" type={type} {...props} />
      )}
    </>
  );
};

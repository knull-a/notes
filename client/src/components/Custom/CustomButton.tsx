type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  isLoading?: boolean
};
export const CustomButton = ({ type = "button", isLoading, text, ...props }: Props) => {
  return (
    <>
      <button disabled={isLoading} className="px-3 py-1 rounded-2xl font-medium hover:bg-slightly-dark" type={type} {...props}>
        {text}
      </button>
    </>
  );
};

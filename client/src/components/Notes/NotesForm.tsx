import { useState, useEffect } from "react";
import { CustomInput } from "../Custom/CustomInput";
import { CustomButton } from "../Custom/CustomButton";
export const NotesForm = () => {
  const [dots, setDots] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  

  return (
    <form className="border border-slightly-dark rounded-xl p-4 shadow-2xl max-w-xl m-auto">
      {(text || title) && (
        <div className="mb-4">
          <CustomInput
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
      <div>
        <CustomInput
          isTextarea
          placeholder={`Note${dots}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {(text || title) && (
        <div className="flex gap-2 justify-end">
          <CustomButton text="Cancel" />
          <CustomButton text="Save" />
        </div>
      )}
    </form>
  );
};

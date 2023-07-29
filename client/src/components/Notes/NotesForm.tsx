import { useState, useEffect } from "react";
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
          <input
            placeholder="Enter title"
            className="input text-xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
      <div>
        <textarea
          placeholder={`Note${dots}`}
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {(text || title) && (
        <div className="flex gap-2 justify-end">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      )}
    </form>
  );
};

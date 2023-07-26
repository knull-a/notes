import { useState, useEffect } from "react";
import {
  mdiArchiveArrowDownOutline,
  mdiDeleteOutline,
  mdiImageOutline,
  mdiPaletteOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import axios from "axios";

import "./NotesPage.css";

export default () => {
  type Label = {};
  type Note = {
    _id: string;
    title: string;
    text: string;
    image: string;
    color: string;
    labels: Label;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: string;
  };
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3001/api/v1/notes");
    setNotes(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!notes) {
    return <div>Нет данных</div>;
  }

  return (
    <div>
      <button onClick={fetchData}>click</button>
      <div className="masonry-3 gap-6">
        {notes.map((note) => {
          return (
            <div
              className="break-inside border border-slightly-dark p-3 cursor-default break-all mb-6 notes rounded-lg"
              key={note._id}
            >
              <h3 className="mb-2 font-medium">{note.title}</h3>
              <p>{note.text}</p>
              <div className="buttons flex justify-center gap-10 mt-4 opacity-0 transition-opacity">
                <button className="btn">
                  <Icon path={mdiPaletteOutline} size={1} />
                </button>
                <button className="btn">
                  <Icon path={mdiImageOutline} size={1} />
                </button>
                <button className="btn">
                  <Icon path={mdiArchiveArrowDownOutline} size={1} />
                </button>
                <button className="btn">
                  <Icon path={mdiDeleteOutline} size={1} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

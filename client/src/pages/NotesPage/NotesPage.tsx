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
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/api/v1/notes");
    console.log(response);
  };
  return (
    <div>
      <button onClick={fetchData}>click</button>
      <div className="flex flex-wrap gap-6 w-full">
        <div className="notes border border-slightly-dark rounded-lg p-3 w-full max-w-xs cursor-default">
          <h3 className="mb-2 text-gray-50">Title</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur, id? Maxime veniam rem facilis. Dolore esse a iste
            earum distinctio ratione aliquid cumque, vero ducimus adipisci
            incidunt suscipit reiciendis voluptatem?
          </p>
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
      </div>
    </div>
  );
};

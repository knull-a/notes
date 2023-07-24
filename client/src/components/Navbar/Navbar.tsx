import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMenu, mdiViewGridOutline, mdiViewAgendaOutline } from "@mdi/js";

import { Searchbar } from "../Sidebar/Searchbar";
import { useSidebarStore } from "@/stores/sidebar";

export default () => {
  const {toggleActive} = useSidebarStore()
  return (
    <div className="fixed top-0 bg-dark z-50 w-full py-2 px-6 border-slightly-dark border-b flex items-center justify-between gap-2">
      <button onClick={toggleActive} className="btn">
        <Icon path={mdiMenu} size={1} />
      </button>
      <Link to={"/"} className="text-2xl mr-2">Notes</Link>
      <div className="">
        <Searchbar width={720} placeholder={"Search"} />
      </div>
      <button className="ml-auto btn">
        <Icon
          path={true ? mdiViewAgendaOutline : mdiViewGridOutline}
          size={1}
        />
      </button>
    </div>
  );
};

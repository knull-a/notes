import { Link } from "react-router-dom";
import Icon from "@mdi/react";

import {
  mdiArchiveOutline,
  mdiLabelOutline,
  mdiNoteMultipleOutline,
  mdiPencilOutline,
} from "@mdi/js";

import classNames from "classnames";

import { useSidebarStore } from "@/stores/sidebar";
import "./Sidebar.css";
import { useLabelQuery } from "@/services/labels/hooks/useLabelQuery";

export const Sidebar = () => {
  const { isActive } = useSidebarStore();
  const sidebarClasses = classNames({
    "fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform border-r border-slightly-dark":
      true,
    "-translate-x-full": isActive === true,
    "translate-x-0": isActive === false,
  });
  const { data: labels } = useLabelQuery("labels");
  return (
    <>
      <div>
        <aside
          id="default-sidebar"
          className={sidebarClasses}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-dark">
            <ul className="space-y-2 font-medium">
              <li>
                <Link to={"/"} className="sidebar-item">
                  <Icon path={mdiNoteMultipleOutline} size={1} />
                  <span className="ml-3">Notes</span>
                </Link>
              </li>
              {labels &&
                labels.length &&
                labels.map((item) => (
                  <li key={item._id}>
                    <Link to={`/notes?name=${item.title}&label=${item._id}`} className="sidebar-item">
                      <Icon path={mdiLabelOutline} size={1} />
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              <li>
                <Link to="/" className="sidebar-item">
                  <Icon path={mdiPencilOutline} size={1} />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Edit Labels
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/archive"} className="sidebar-item">
                  <Icon path={mdiArchiveOutline} size={1} />
                  <span className="flex-1 ml-3 whitespace-nowrap">Archive</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

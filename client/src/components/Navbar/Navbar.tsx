import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiMenu,
  mdiViewGridOutline,
  mdiViewAgendaOutline,
  mdiLogout,
  mdiEmailAlert,
  mdiEmail,
} from "@mdi/js";

import { Searchbar } from "../Sidebar/Searchbar";
import { useSidebarStore } from "@/stores/sidebar";
import { useNavbarStore } from "@/stores/navbar";
import { CustomButton } from "../Custom/CustomButton";
import { useAuthStore } from "@/stores/auth";
import getUsername from "@/utils/getUsername";

export const Navbar = () => {
  const { toggleActive } = useSidebarStore();
  const { toggleColumn, isColumn } = useNavbarStore();
  const { user, logout } = useAuthStore();

  return (
    <div className="fixed top-0 bg-dark z-50 w-full py-2 px-6 border-slightly-dark border-b flex items-center justify-between gap-2">
      <button onClick={toggleActive} className="btn">
        <Icon path={mdiMenu} size={1} />
      </button>
      <Link to={"/"} className="text-2xl mr-2">
        Notes
      </Link>
      <div>
        <Searchbar width={720} placeholder="Search" />
      </div>
      <button className="ml-auto btn" onClick={toggleColumn}>
        <Icon
          path={isColumn ? mdiViewGridOutline : mdiViewAgendaOutline}
          size={1}
        />
      </button>
      {!user.isActivated && <Icon path={mdiEmailAlert} size={1} />}
      <CustomButton
        onClick={logout}
        icon={{ path: mdiLogout, size: 1 }}
        text={getUsername(user.email)}
      />
    </div>
  );
};

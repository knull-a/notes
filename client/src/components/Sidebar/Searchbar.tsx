import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import classNames from "classnames";
import React, { useState } from "react";
import { useInfiniteNotes } from "@/services/notes/hooks/useInfiniteNotes";
import { useSearchStore } from "@/stores/search";

type Props = {
  placeholder?: string;
  width?: number;
};

export const Searchbar = ({ width = 320, ...props }: Props) => {
  const containerClasses = classNames({
    "bg-slightly-dark rounded-xl p-3 flex": true,
  });

  const {
    pathName,
    searchText: searchValue,
    setSearchText: setSearchValue,
  } = useSearchStore();

  const inputClasses = classNames({
    "ml-2 outline-none bg-transparent placeholder:text-white": true,
    "w-[320px]": width === 320,
    "w-[720px]": width === 720,
  });

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <label className={containerClasses}>
      <Icon path={mdiMagnify} size={1} color="white" />
      <input
        className={inputClasses}
        onChange={(e) => search(e)}
        type="text"
        placeholder={props.placeholder}
        {...props}
      />
      {searchValue}
    </label>
  );
};

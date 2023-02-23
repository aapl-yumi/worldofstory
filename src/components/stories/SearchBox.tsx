import "./SearchBox.scss";

import { useState } from "react";

import { Icon } from "@iconify/react";

import type { Search } from "./MapAndStories";

export default function SearchBox({
  search,
  setSearch,
}: {
  search: Search;
  setSearch: (search: Search) => void;
}) {
  const [searchInput, setSearchInput] = useState("");

  function onSearchInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
    setSearch({ ...search, search: e.target.value });
  }

  return (
    <div className="w-full flex items-center justify-end my-4" id="search">
      <div className="searchbox-container">
        <Icon icon="carbon:search" className="search-icon" />
        <input
          type="text"
          placeholder="Country, name, etc"
          aria-label="Search for continents, countries, individual names, and more"
          value={searchInput}
          onChange={onSearchInputChanged}
        />
      </div>
    </div>
  );
}

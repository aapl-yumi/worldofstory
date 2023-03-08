import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';

import FilterChip from './FilterChip';
import { continentsDefault } from './FilterModal';
import { defaultSearch, Search, Tag } from './MapAndStories';

import type { Filter } from "@components/stories/FilterChip";

countries.registerLocale(en);

export default function FilterChipContainer({
  search,
  setSearch,
  setFilterModalIsOpen,
  tags,
  setTags,
}: {
  search: Search;
  setSearch: (search: Search) => void;
  setFilterModalIsOpen: (isOpen: boolean) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}) {
  const [filters, setFilters] = useState<Filter[]>([
    {
      type: "continent",
      label: "North America",
      code: "na",
      active: false,
    },
    {
      type: "continent",
      label: "Africa",
      code: "af",
      active: false,
    },
    {
      type: "tag",
      label: "Clean Energy",
      code: "2",
      active: false,
    },
    {
      type: "tag",
      label: "Education",
      code: "6",
      active: false,
    },
    {
      type: "tag",
      label: "Peace",
      code: "12",
      active: false,
    },
    {
      type: "tag",
      label: "Innovation",
      code: "9",
      active: false,
    },
  ]);

  useEffect(() => {
    // reset filters
    let newFilters = filters.map((f) => {
      return { ...f, active: false };
    });
    // add filter chip for those that are in search
    search.continent.split(",").forEach((code) => {
      if (code === "") return;
      // if code is in filter list, set active to true
      let filter = newFilters.find((f) => f.code === code);
      if (filter) {
        filter.active = true;
        return;
      }
      // if code is not in filter list, add it to the front of the list
      let continent = continentsDefault.find((c) => c.code === code);
      newFilters.unshift({
        type: "continent",
        label: continent?.name || code,
        code: code,
        active: true,
      });
    });
    search.tag.split(",").forEach((code) => {
      if (code === "") return;
      // if code is in filter list, set active to true
      let filter = newFilters.find((f) => f.code === code);
      if (filter) {
        filter.active = true;
        return;
      }
      // if code is not in filter list, add it to the front of the list
      let tag = tags.find((t) => t.tagid.toString() === code);
      newFilters.unshift({
        type: "tag",
        label: tag?.title || code,
        code: code,
        active: true,
      });
    });
    search.country.split(",").forEach((code) => {
      if (code === "") return;
      // if code is in filter list, set active to true
      let filter = newFilters.find((f) => f.code === code);
      if (filter) {
        filter.active = true;
        return;
      }
      // if code is not in filter list, add it to the front of the list
      newFilters.unshift({
        type: "country",
        label: countries.getName(code.toLowerCase(), "en") || code,
        code: code,
        active: true,
      });
    });

    // sort filters by active
    newFilters.sort((a, b) => {
      if (a.active && !b.active) return -1;
      if (!a.active && b.active) return 1;
      return 0;
    });
    setFilters(newFilters);
  }, [search]);

  function onFilterChipClicked(filter: Filter) {
    let newSearch: Search = defaultSearch();
    filters.forEach((f) => {
      if (f.code === filter.code && f.type === filter.type) {
        f.active = !f.active;
      }
      if (f.active && newSearch[f.type] === "") {
        newSearch[f.type] = f.code;
      } else if (f.active && newSearch[f.type] !== "") {
        newSearch[f.type] += "," + f.code;
      }
    });
    setFilters([...filters]);
    setSearch(newSearch);
  }

  return (
    <div className="flex items-center justify-start my-8 horizontal-scroll">
      <button
        className="flex flex-row justify-center items-center py-[10px] px-4 rounded-full border mr-2"
        style={{
          background: "rgb(var(--color))",
          color: "rgb(var(--background))",
        }}
        onClick={() => setFilterModalIsOpen(true)}
      >
        <Icon
          className="mr-2 text-3xl"
          icon="heroicons:adjustments-horizontal"
        />
        <span className="uppercase text-lg">Filter</span>
      </button>
      {filters.map((filter) => (
        <FilterChip
          key={filter.code}
          filter={filter}
          onClick={onFilterChipClicked}
        />
      ))}
    </div>
  );
}

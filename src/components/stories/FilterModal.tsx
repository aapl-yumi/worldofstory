import "./FilterModal.scss";

import React, { useEffect, useState } from "react";

import { Button, Checkbox, FormControlLabel, Modal } from "@mui/material";

import CloseButton from "./CloseButton";
import { defaultSearch, Search, Tag } from "./MapAndStories";

export const continentsDefault = [
  { name: "Africa", code: "af", checked: false },
  { name: "Asia", code: "as", checked: false },
  { name: "Europe", code: "eu", checked: false },
  { name: "North America", code: "na", checked: false },
  { name: "Oceania", code: "oc", checked: false },
  { name: "South America", code: "sa", checked: false },
];

export default function FilterModal({
  open,
  search,
  setSearch,
  setFilterModalIsOpen,
  tags,
  setTags,
}: {
  open: boolean;
  search: Search;
  setSearch: (search: Search) => void;
  setFilterModalIsOpen: (filterModalIsOpen: boolean) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}) {
  const [continents, setContinents] = useState<any[]>(continentsDefault);

  useEffect(() => {
    setFromSearch();
  }, []);

  useEffect(() => {
    setFromSearch();
  }, [search]);

  const checkBoxStyle = {
    color: "rgb(var(--color))",
    fontSize: "1.5rem",
  };

  function setFromSearch() {
    let newContinents = continents.map((continent) => {
      if (search.continent.includes(continent.code)) {
        continent.checked = true;
      } else {
        continent.checked = false;
      }
      return continent;
    });
    setContinents(newContinents);
    let newTags = tags.map((tag) => {
      if (search.tag.includes(tag.tagid.toString())) {
        tag.checked = true;
      } else {
        tag.checked = false;
      }
      return tag;
    });
    setTags(newTags);
  }

  function handleChange(
    type: "all-continents" | "all-topics" | "continent" | "tag",
    code?: string
  ) {
    let newContinents;
    let newTags;
    let allCheck: boolean;
    switch (type) {
      case "all-continents":
        allCheck = continents.every((continent) => continent.checked)
          ? false
          : true;
        newContinents = continents.map((continent) => {
          continent.checked = allCheck;
          return continent;
        });
        setContinents(newContinents);
        break;
      case "all-topics":
        allCheck = tags.every((tag) => tag.checked) ? false : true;
        newTags = tags.map((tag) => {
          tag.checked = allCheck;
          return tag;
        });
        setTags(newTags);
        break;
      case "continent":
        newContinents = continents.map((continent) => {
          if (continent.code === code) {
            continent.checked = !continent.checked;
          }
          return continent;
        });
        setContinents(newContinents);
        break;
      case "tag":
        newTags = tags.map((tag) => {
          if (tag.tagid.toString() === code) {
            tag.checked = !tag.checked;
          }
          return tag;
        });
        setTags(newTags);
        break;
      default:
        break;
    }
  }

  function handleApply() {
    let newSearch = { ...search };
    newSearch.continent = "";
    newSearch.tag = "";
    continents.forEach((continent) => {
      if (continent.checked) {
        newSearch.continent += continent.code + ",";
      }
    });
    newSearch.continent = newSearch.continent.slice(0, -1);
    tags.forEach((tag) => {
      if (tag.checked) {
        newSearch.tag += tag.tagid + ",";
      }
    });
    newSearch.tag = newSearch.tag.slice(0, -1);
    setSearch(newSearch);
    setFilterModalIsOpen(false);
  }

  function handleClear() {
    let newContinents = continents.map((continent) => {
      continent.checked = false;
      return continent;
    });
    let newTags = tags.map((tag) => {
      tag.checked = false;
      return tag;
    });
    setContinents(newContinents);
    setTags(newTags);
    setSearch(defaultSearch());
    setFilterModalIsOpen(false);
  }

  return (
    <Modal
      open={open}
      onClose={() => setFilterModalIsOpen(false)}
      onBackdropClick={() => setFilterModalIsOpen(false)}
      aria-labelledby="Filter Modal"
      aria-describedby="Choose filter options to narrow down your search with the map and stories."
      keepMounted
    >
      <div className="filter-modal">
        <div className="absolute top-4 right-4">
          <CloseButton onClick={() => setFilterModalIsOpen(false)} />
        </div>
        <h1 className="text-2xl mb-4 uppercase font-semibold">Filter</h1>
        <div className="filter-options vertical-scroll">
          <div className="continent-filter-boxes filter-boxes">
            <FormControlLabel
              control={
                <Checkbox
                  name="all-continents"
                  style={checkBoxStyle}
                  onClick={() => handleChange("all-continents")}
                  checked={continents.every((continent) => continent.checked)}
                />
              }
              key="all-continents"
              label="All Continents"
              style={{ textTransform: "uppercase" }}
            />
            {continents.map((continent) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={continent.name}
                    style={{ ...checkBoxStyle, marginLeft: "2rem" }}
                    onChange={() => handleChange("continent", continent.code)}
                    checked={continent.checked}
                  />
                }
                key={continent.code}
                label={continent.name}
              />
            ))}
          </div>
          <div className="tag-filter-boxes filter-boxes">
            <FormControlLabel
              control={
                <Checkbox
                  name="tag-all"
                  style={checkBoxStyle}
                  onClick={() => handleChange("all-topics")}
                  checked={tags.every((tag) => tag.checked)}
                />
              }
              key="all-topics"
              label="All Topics"
              style={{ textTransform: "uppercase" }}
            />
            {tags.map((tag) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={tag.title}
                    style={{ ...checkBoxStyle, marginLeft: "2rem" }}
                    onChange={() => handleChange("tag", tag.tagid.toString())}
                    checked={tag.checked}
                  />
                }
                key={tag.tagid}
                label={tag.title.replace(/(^\w)|(\s+\w)/g, (letter: string) =>
                  letter.toUpperCase()
                )}
                onChange={() => handleChange("tag", tag.tagid.toString())}
              />
            ))}
          </div>
          <img
            src="/assets/images/scrollformore.min.png"
            alt="Scroll for more"
            className="absolute bottom-5 right-5 h-32 w-auto z-index-0"
          />
        </div>
        <div className="filter-option-buttons mt-4">
          <Button
            variant="contained"
            onClick={handleClear}
            style={{
              backgroundColor: "transparent",
              color: "rgb(var(--color))",
              border: "1px solid rgb(var(--color))",
              borderRadius: "10px",
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            style={{
              marginLeft: "1rem",
              backgroundColor: "rgb(var(--color))",
              color: "rgb(var(--background))",
              borderRadius: "10px",
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}

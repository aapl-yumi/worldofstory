import { useEffect, useState } from "react";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import FilterChipContainer from "@components/stories/FilterChipContainer";
import FilterModal from "@components/stories/FilterModal";
import Map from "@components/stories/Map";
import ReadStoryGuide from "@components/stories/ReadStoryGuide";
import SearchBox from "@components/stories/SearchBox";
import ShowCount from "@components/stories/ShowCount";
import StoryContainer from "@components/stories/StoryContainer";
import UsePagination from "@components/stories/UsePagination";

import type { Story } from "@components/stories/StoryCard";
export interface Search {
  country: string;
  continent: string;
  tag: string;
  search: string;
}

export interface Tag {
  tagid: number;
  title: string;
  checked?: boolean;
}

export const defaultSearch = () => {
  return {
    country: "",
    continent: "",
    tag: "",
    search: "",
  };
};

export default function MapAndStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [search, setSearch] = useState<Search>(defaultSearch());
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(Math.ceil(count / 9));
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const apiUrl = "https://api.worldroad.org/lateststories";
  const countUrl = "https://api.worldroad.org/count";
  const tagUrl = "https://api.worldroad.org/tags";

  const theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    palette: {
      primary: {
        main: "rgb(var(--accent))",
      },
      text: {
        primary: "rgb(var(--color))",
      },
    },
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setStories(data);
        });
      fetch(countUrl)
        .then((response) => response.json())
        .then((data) => {
          setCount(data);
          setNumOfPage(Math.ceil(data / 9));
        });
      fetch(tagUrl)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((tag: any) => {
            tag.checked = false;
          });
          setTags(data);
        });
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let params = new URLSearchParams();
    if (search.country) {
      params.append("country", search.country);
    }
    if (search.continent) {
      params.append("continent", search.continent);
    }
    if (search.tag) {
      params.append("tags", search.tag);
    }
    if (search.search) {
      params.append("q", search.search);
    }
    params.append("p", currentPage.toString());
    fetch(`${apiUrl}?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setStories(data);
      });
    fetch(`${countUrl}?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
        setNumOfPage(Math.ceil(data / 9));
      });
    setIsLoading(false);
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <ThemeProvider theme={theme}>
      <ReadStoryGuide />
      <Map search={search} setSearch={setSearch} />
      <div className="w-[90vw] max-w-4xl m-auto">
        <FilterChipContainer
          search={search}
          setSearch={setSearch}
          setFilterModalIsOpen={setFilterModalIsOpen}
          tags={tags}
          setTags={setTags}
        />
        <div>
          <FilterModal
            open={filterModalIsOpen}
            search={search}
            setSearch={setSearch}
            setFilterModalIsOpen={setFilterModalIsOpen}
            tags={tags}
            setTags={setTags}
          />
        </div>
        <SearchBox search={search} setSearch={setSearch} />
        <div className="relative my-3">
          {isLoading || stories.length === 0 ? (
            <LinearProgress className="absolute top-0 left-0 w-full" />
          ) : (
            <></>
          )}
        </div>
        <ShowCount count={count} />
        <StoryContainer stories={stories} isLoading={isLoading} />
        <div className="relative my-3">
          {isLoading || stories.length === 0 ? (
            <LinearProgress className="absolute top-0 left-0 w-full" />
          ) : (
            <></>
          )}
        </div>
        <UsePagination
          count={numOfPage}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </div>
    </ThemeProvider>
  );
}

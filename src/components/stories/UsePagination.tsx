import type * as React from "react";
import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import usePagination from '@mui/material/usePagination';

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function UsePagination({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  const { items } = usePagination({
    count: count,
    page: page,
    onChange: onChange,
    boundaryCount: 1,
  });

  return (
    <nav className="w-full flex justify-center items-center my-28">
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  color: "rgb(var(--color))",
                  width: "2.5rem",
                  height: "2rem",
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                style={{
                  color: item.disabled
                    ? "var(--pagination-disabled-color)"
                    : "",
                }}
              >
                {type === "previous" ? (
                  <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
                ) : (
                  <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                )}
              </button>
            );
          }
          return (
            <li
              key={index}
              className="flex justify-center items-center mx-2 max-md:mx-1"
              style={{
                backgroundColor: selected
                  ? "var(--pagination-selected-background)"
                  : "transparent",
                borderRadius: "1rem",
              }}
            >
              {children}
            </li>
          );
        })}
      </List>
    </nav>
  );
}

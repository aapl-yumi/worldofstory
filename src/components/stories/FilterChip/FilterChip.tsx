import "./FilterChip.scss";

import { Icon } from "@iconify/react";

export interface Filter {
  type: "tag" | "country" | "continent";
  label: string;
  code: string;
  active?: boolean;
}

export default function FilterChip({
  filter,
  onClick,
}: {
  filter: Filter;
  onClick: (filter: Filter) => void;
}) {
  function clicked() {
    onClick({ ...filter, active: !filter.active });
  }

  return (
    <button
      onClick={clicked}
      className={filter.active ? "filter-chip active" : "filter-chip"}
      aria-label={`Filter by ${filter.label}`}
    >
      <span className="capitalize">{filter.label}</span>
      <Icon icon="system-uicons:cross-circle" />
    </button>
  );
}

import { useEffect, useState } from "react";
import type { Story } from "../stories/StoryCard";
import StoryContainer from "../stories/StoryContainer";

export default function TeamPick() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("https://api.worldroad.org/staffpick")
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
      });
  });

  return <StoryContainer stories={stories} />;
}

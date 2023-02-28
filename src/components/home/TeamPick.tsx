import { useEffect, useState } from 'react';

import StoryContainer from '../stories/StoryContainer';

import type { Story } from "../stories/StoryCard";
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

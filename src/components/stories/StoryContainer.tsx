import React, { useEffect, useState } from "react";

import StoryCard, { Story } from "./StoryCard";
import StoryModal from "./StoryModal";
import { Skeleton } from "@mui/material";

export default function StoryContainer({
  stories,
  isLoading,
}: {
  stories: Story[];
  isLoading?: boolean;
}) {
  const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story>(stories[0]);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setHorizontal(true);
    }
  }, []);

  return (
    <>
      <div>
        {selectedStory && (
          <StoryModal
            open={storyModalIsOpen}
            setStoryModalIsOpen={setStoryModalIsOpen}
            story={selectedStory}
          />
        )}
      </div>
      <div
        className={
          horizontal
            ? "horizontal-scroll flex flex-row gap-4"
            : "grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:px-3 gap-4"
        }
      >
        {stories.map((story: Story) => (
          <StoryCard
            key={story.id}
            story={story}
            setSelectedStory={setSelectedStory}
            setStoryModalIsOpen={setStoryModalIsOpen}
          />
        ))}
      </div>
    </>
  );
}

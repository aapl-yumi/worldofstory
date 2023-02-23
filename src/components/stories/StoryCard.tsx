import "./StoryCard.scss";
import "./ContinentColor.scss";

export interface Story {
  id: string;
  title: string;
  name: string;
  image: string;
  country: string;
  countrycode: string;
  continent: string;
  story: string;
  time: string;
  love?: number;
  facebook?: string;
  instagram?: string;
  links?: string;
  twitter?: string;
  tiktok?: string;
  inbook?: string;
  photocredit?: string;
}

export default function StoryCard({
  story,
  setSelectedStory,
  setStoryModalIsOpen,
}: {
  story: Story;
  setSelectedStory: (story: Story) => void;
  setStoryModalIsOpen: (storyModalIsOpen: boolean) => void;
}) {
  const openModal = () => {
    setSelectedStory(story);
    setStoryModalIsOpen(true);
  };

  return (
    <div
      className="story-card"
      id={"story-" + story.id}
      onClick={openModal}
      style={{
        backgroundImage: `url(/assets/images/dreamers/${story.id}.png)`,
      }}
    >
      <p
        className={
          "continent " + story.continent.toLowerCase().replace(/\s+/g, "")
        }
      >
        {story.continent}
      </p>
      <div className="bio">
        <div className="country">
          <img
            src={"/assets/images/countries/" + story.countrycode + ".png"}
            alt={"Flag of " + story.country}
          />
          <p className="country">{story.country}</p>
        </div>
        <p className="px-2">
          {story.title.length > 40
            ? story.title.slice(0, 50) + "..."
            : story.title}
        </p>
        <p className="text-sm">- {story.name}</p>
        {story.inbook == "TRUE" ? (
          <img
            src="/assets/images/featured-in-book.min.png"
            alt="Featured in book"
            className="inbook"
          />
        ) : (
          ""
        )}
      </div>
      <span className="id">{story.id}</span>
      <span className="title">{story.title}</span>
      <span className="story">{story.story}</span>
      <span className="countrycode">{story.countrycode}</span>
      <span className="time">{story.time}</span>
      <span className="love">{story.love || 0}</span>
      <span className="facebook">{story.facebook || ""}</span>
      <span className="instagram">{story.instagram || ""}</span>
      <span className="twitter">{story.twitter || ""}</span>
      <span className="links">{story.links || ""}</span>
      <span className="tiktok">{story.tiktok || ""}</span>
    </div>
  );
}

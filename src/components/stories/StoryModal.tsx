import "./ContinentColor.scss";
import "./StoryModal.scss";

import html2canvas from "html2canvas";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";
import { Button, CircularProgress, IconButton, Modal } from "@mui/material";

import CategoryChip from "./CategoryChip";
import CloseButton from "./CloseButton";

import type { Story } from "./StoryCard";
export default function StoryModal({
  open,
  setStoryModalIsOpen,
  story,
}: {
  open: boolean;
  setStoryModalIsOpen: (storyModalIsOpen: boolean) => void;
  story: Story;
}) {
  const [isLoved, setIsLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(story.love || 0);
  const [tags, setTags] = useState<{ tagid: number; title: string }[]>([]);
  const [isDownloadModalOpen, setDownloadModalIsOpen] = useState(false);
  const [isDownloadImageCreating, setIsDownloadImageCreating] = useState(false);
  const storyModalRef = useRef<HTMLDivElement>(null);
  const storyModalCloseButtonRef = useRef<HTMLDivElement>(null);
  const storyModalImageRef = useRef<HTMLDivElement>(null);
  const storyModalShareRef = useRef<HTMLDivElement>(null);
  const storyModalHeaderRef = useRef<HTMLDivElement>(null);
  const storyModalBodyRef = useRef<HTMLDivElement>(null);
  const storyModalFooterRef = useRef<HTMLDivElement>(null);
  const storyModalCategoryRef = useRef<HTMLDivElement>(null);
  const storyModalConnectRef = useRef<HTMLDivElement>(null);
  const storyModalOverLayerRef = useRef<HTMLDivElement>(null);
  const storyCardDownloadRef = useRef<HTMLDivElement>(null);
  const fullPageDownloadRef = useRef<HTMLDivElement>(null);
  const shareStoriesDownloadRef = useRef<HTMLDivElement>(null);
  const shareStoriesImageRef = useRef<HTMLImageElement>(null);
  let cacheId = localStorage.getItem("cacheId") as string;

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [story]);

  const init = () => {
    getTags();

    if (!cacheId) {
      // if not found, generate a new one
      const newCacheId = randomId();
      localStorage.setItem("cacheId", newCacheId);
      cacheId = newCacheId;
    }
    // if found, check if story id is in local storage and set isLoved to true
    const thisStoryLoved = localStorage.getItem(cacheId + "-love-" + story.id);
    if (thisStoryLoved === "true") {
      setIsLoved(true);
    } else {
      setIsLoved(false);
    }
  };

  const getTags = () => {
    fetch(`https://api.worldroad.org/tags?id=${story.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      });
  };

  const loveStory = () => {
    switch (isLoved) {
      case true:
        fetchLoveStory(cacheId, false).then((res) =>
          setLoveCount(res.love || 0)
        );
        localStorage.removeItem(cacheId + "-love-" + story.id);
        setIsLoved(!isLoved);
        break;
      case false:
        fetchLoveStory(cacheId, true).then((res) =>
          setLoveCount(res.love || 0)
        );
        localStorage.setItem(cacheId + "-love-" + story.id, "true");
        setIsLoved(!isLoved);
        break;
    }
  };

  const fetchLoveStory = async (cacheId: string, add: boolean) => {
    const addOrRemove = add ? "add" : "remove";
    const response = fetch(
      `https://api.worldroad.org/love?id=${story.id}&cacheId=${cacheId}&love=${addOrRemove}`
    ).then((response: any) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    });
    return response;
  };

  const onShareClick = () => {
    const link = `https://worldofstory.worldroad.org/stories?id=${story.id}`;
    navigator.clipboard.writeText(link);
  };

  const onDownloadClick = () => {
    setIsDownloadImageCreating(true);
    createDownloadableImages();
    setTimeout(() => {
      setIsDownloadImageCreating(false);
    }, 1000);
    setDownloadModalIsOpen(true);
  };

  const download = () => {
    const storyCardCanvas = storyCardDownloadRef.current
      ?.firstChild as HTMLCanvasElement;
    const fullPageCanvas = fullPageDownloadRef.current
      ?.firstChild as HTMLCanvasElement;
    const shareStoriesCanvas = shareStoriesDownloadRef.current
      ?.firstChild as HTMLCanvasElement;
    const storyCardImg = storyCardCanvas.toDataURL("image/png");
    const fullPageImg = fullPageCanvas.toDataURL("image/png");
    const shareStoriesImg = shareStoriesCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = story.id + "-story-card.png";
    link.href = storyCardImg;
    link.click();
    link.download = story.id + "-full-page.png";
    link.href = fullPageImg;
    link.click();
    link.download = "share-stories.png";
    link.href = shareStoriesImg;
    link.click();
  };

  const createDownloadableImages = () => {
    createStoryCardCanvas();
    createFullPageCanvas();
    createShareImageCanvas();
  };

  const createStoryCardCanvas = () => {
    const storyCard = document.getElementById(
      "story-" + story.id
    ) as HTMLDivElement;
    html2canvas(storyCard, {
      width: storyCard.offsetWidth,
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      storyCardDownloadRef.current?.appendChild(canvas);
    });
  };

  const createFullPageCanvas = () => {
    const fullPage = storyModalRef.current as HTMLDivElement;
    // hide some parts from the modal
    const elementsToHide = [
      storyModalCloseButtonRef,
      storyModalShareRef,
      storyModalCategoryRef,
      storyModalConnectRef,
    ];
    elementsToHide.forEach((element) => {
      element.current?.classList.add("hidden");
    });

    fullPage.classList.remove("vertical-scroll");
    const horScroll =
      storyModalCategoryRef.current?.querySelector(".horizontal-scroll");
    horScroll?.classList.remove("horizontal-scroll");

    storyModalOverLayerRef.current!.style.display = "block";

    fullPage.classList.add("capture");
    fullPage.classList.add("remove-max-min-wh");

    html2canvas(fullPage, {
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      fullPageDownloadRef.current?.appendChild(canvas);
    });

    elementsToHide.forEach((element) => {
      element.current?.classList.remove("hidden");
    });

    fullPage.classList.add("vertical-scroll");
    horScroll?.classList.add("horizontal-scroll");

    storyModalOverLayerRef.current!.style.display = "none";

    fullPage.classList.remove("capture");
    fullPage.classList.remove("remove-max-min-wh");
  };

  const createShareImageCanvas = () => {
    // make image to canvas
    shareStoriesImageRef.current!.style.display = "block";
    html2canvas(shareStoriesImageRef.current!, {
      backgroundColor: null,
      useCORS: true,
    }).then((canvas) => {
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      shareStoriesDownloadRef.current?.appendChild(canvas);
    });
    shareStoriesImageRef.current!.style.display = "none";
  };

  const randomId = (n: number = 16) => {
    return [...Array(n)]
      .map((i) => (~~(Math.random() * 36)).toString(36))
      .join("");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setStoryModalIsOpen(false)}
        onBackdropClick={() => setStoryModalIsOpen(false)}
        aria-labelledby="Story modal"
        aria-describedby={"Read the story of " + story.name}
      >
        <div
          className="vertical-scroll story-modal fixed top-0 left-1/2 -translate-x-1/2 pt-10 px-14 max-md:px-5 max-h-full w-[99vw] max-md:w-full max-w-[1000px] bg-[rgb(var(--story-background))] text-black"
          ref={storyModalRef}
        >
          <img
            ref={shareStoriesImageRef}
            src="/assets/images/share-your-story.min.png"
            alt="Share stories"
            style={{
              display: "none",
            }}
          />
          <div
            className="absolute top-4 right-4"
            ref={storyModalCloseButtonRef}
          >
            <CloseButton onClick={() => setStoryModalIsOpen(false)} />
          </div>
          <div className="mb-20">
            <div
              className="modal-image relative flex flex-col items-center justify-center"
              ref={storyModalImageRef}
            >
              <p
                className={
                  "w-min mx-auto continent " +
                  story.continent.toLowerCase().replace(/\s+/g, "")
                }
              >
                {story.continent}
              </p>
              <img
                className="dreamer max-h-[500px] max-w-[100%]"
                src={"https://api.worldroad.org/dreamers/" + story.id + ".webp"}
                alt="Dreamer Photo"
              />
              {story.inbook == "TRUE" ? (
                <img
                  src="/assets/images/featured-in-book.min.png"
                  alt="Featured in the book"
                  className="absolute bottom-2 right-2 h-20 w-20"
                />
              ) : null}
              {story.photocredit ? (
                <p className="italic">{story.photocredit}</p>
              ) : null}
            </div>
            <div
              className="flex flex-row w-full justify-end items-center my-2"
              ref={storyModalShareRef}
            >
              <IconButton
                aria-label="Love"
                size="large"
                onClick={() => loveStory()}
                className="flex flex-col items-center justify-center"
              >
                <Icon
                  icon={isLoved ? "mdi:heart" : "ph:heart"}
                  className="text-3xl"
                  style={{ color: isLoved ? "#f00" : "#000" }}
                />
                <span className="text-base text-black">{loveCount}</span>
              </IconButton>
              <IconButton
                aria-label="Share"
                size="large"
                className="flex flex-col items-center justify-center"
                onClick={onShareClick}
              >
                <Icon
                  icon="mdi:share"
                  className="text-3xl"
                  style={{ color: "#000" }}
                />
                <span className="text-base text-black uppercase">Share</span>
              </IconButton>
              <IconButton
                aria-label="Download"
                size="large"
                onClick={() => onDownloadClick()}
                className="flex flex-col items-center justify-center"
              >
                <Icon
                  icon="material-symbols:download-rounded"
                  className="text-3xl"
                  style={{ color: "#000" }}
                />
                <span className="text-base text-black uppercase">Download</span>
              </IconButton>
            </div>
            <div
              className="times px-20 max-md:px-0 mt-10"
              ref={storyModalHeaderRef}
            >
              <div className="flex items-center justify-start flex-row">
                <p className="text-2xl">{story.country}</p>
                <img
                  src={"/assets/images/countries/" + story.countrycode + ".png"}
                  alt={"Flag of " + story.country}
                  className="h-8 w-auto ml-4"
                  style={{
                    border: "2px solid black",
                    display: "block",
                  }}
                />
              </div>
              <h1
                className="pl-4 text-3xl my-3"
                style={{
                  borderLeft: "8px solid rgb(var(--accent))",
                }}
              >
                {story.title}
              </h1>
            </div>
            <div
              className="modal-body times text-justify px-20 max-md:px-0 first-letter:text-3xl"
              ref={storyModalBodyRef}
            >
              {story.story.split(/(\r\n|\n|\r)/gm).map((paragraph, index) => (
                <p key={index} className="text-xl mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
            <div
              className="times flex justify-center items-end flex-col text-xl leading-normal my-2 px-20 max-md:px-0"
              ref={storyModalFooterRef}
            >
              <p>{story.name}</p>
              <p>{DateTime.fromSQL(story.time).toFormat("LLL dd, yyyy")}</p>
            </div>
            {tags.length > 0 && (
              <div className="px-20" ref={storyModalCategoryRef}>
                <h3 className="text-base my-2">Category</h3>
                <div className="horizontal-scroll w-auto flex flex-row items-center justify-start mt-4 mb-8 gap-2 text-base text-white">
                  {tags.map((tag, i) => (
                    <CategoryChip key={i} filter={tag} />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-10 px-20 max-md:px-0" ref={storyModalConnectRef}>
              <p>Connect with {story.name}</p>
              <div className="flex flex-row justify-start items-center my-3 gap-2">
                {story.links ? (
                  <a href={story.links} target="_blank" rel="noreferrer">
                    <Icon
                      icon="dashicons:admin-site-alt3"
                      className="text-4xl"
                      style={{ color: "#000" }}
                    />
                  </a>
                ) : null}
                {story.facebook ? (
                  <a href={story.facebook} target="_blank" rel="noreferrer">
                    <Icon
                      icon="mdi:facebook"
                      className="text-4xl"
                      style={{ color: "#000" }}
                    />
                  </a>
                ) : null}
                {story.instagram ? (
                  <a href={story.instagram} target="_blank" rel="noreferrer">
                    <Icon
                      icon="ph:instagram-logo-fill"
                      className="text-4xl"
                      style={{ color: "#000" }}
                    />
                  </a>
                ) : null}
                {story.twitter ? (
                  <a href={story.twitter} target="_blank" rel="noreferrer">
                    <Icon
                      icon="mdi:twitter"
                      className="text-4xl"
                      style={{ color: "#000" }}
                    />
                  </a>
                ) : null}
                {story.tiktok ? (
                  <a href={story.tiktok} target="_blank" rel="noreferrer">
                    <Icon
                      icon="mdi:tiktok"
                      className="text-4xl"
                      style={{ color: "#000" }}
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div
            ref={storyModalOverLayerRef}
            style={{
              display: "none",
              position: "absolute",
              bottom: "0",
              left: "0",
              transform: "translate(-50%, 50%)",
              width: "1571px",
              height: "1400px",
              backgroundColor: "rgb(var(--story-background))",
              background:
                "linear-gradient(180deg, rgba(254, 253, 247, 0) 0%, #FEFDF7 11.98%)",
              borderRadius: "100%",
            }}
          >
            <p className="uppercase text-4xl bold text-[rgb(var(--accent))] absolute right-[18rem] top-[17rem] flex flex-row items-center">
              <img
                src="/assets/images/light-logo.png"
                alt="World of Story logo"
                style={{
                  height: "4rem",
                  marginRight: "1rem",
                }}
              />
              World of Story
            </p>
            <div
              className="absolute right-[10rem] top-[26rem]"
              style={{ fontWeight: "bold", fontSize: "2rem" }}
            >
              <p className="">Please visit</p>
              <p className="underline">https://worldofstory.worldroad.org/</p>
              <p className="w-full text-right">to read the full story</p>
            </div>
          </div>
        </div>
      </Modal>
      {isDownloadModalOpen && (
        <Modal
          open={isDownloadModalOpen}
          onClose={() => setDownloadModalIsOpen(false)}
          onBackdropClick={() => setDownloadModalIsOpen(false)}
          aria-labelledby="Download modal"
          aria-describedby="Download the story as images on your device"
        >
          <div className="fixed w-[80%] max-md:w-full h-full top-0 left-1/2 -translate-x-1/2 bg-[var(--download-modal-background)] pt-32 pb-14 flex justify-center flex-col text-center">
            <div className="absolute right-5 top-5">
              <CloseButton onClick={() => setDownloadModalIsOpen(false)} />
            </div>
            <div className="absolute left-1/2 top-5 -translate-x-1/2 pb-4 max-md:w-full max-md:px-4">
              <h1 className="font-bold text-2xl">Download</h1>
              <h2 className="text-xl my-5">
                Share these images on social media or according to your needs!
              </h2>
            </div>
            <div className="flex flex-col gap-4 items-center justify-start vertical-scroll h-full">
              {isDownloadImageCreating && (
                <CircularProgress className="absolute top-1/2 left-1/2" />
              )}
              <div
                ref={storyCardDownloadRef}
                style={{
                  width: "240px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              ></div>
              <p className="text-xl">Story Card</p>
              <div
                ref={fullPageDownloadRef}
                style={{
                  width: "240px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              ></div>
              <p className="text-xl">Full Story</p>
              <div
                ref={shareStoriesDownloadRef}
                style={{
                  width: "240px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                }}
              ></div>
              <p className="text-xl pb-10">Share Stories!</p>
            </div>
            <Button
              variant="contained"
              onClick={download}
              style={{
                backgroundColor: "rgb(var(--color))",
                color: "rgb(var(--background))",
                borderRadius: "10px",
                width: "min-content",
              }}
              className="absolute left-1/2 -bottom-2 -translate-x-1/2"
            >
              Download
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

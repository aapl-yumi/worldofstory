import './ReadStoryGuide.scss';

import { useEffect, useRef, useState } from 'react';

import CloseButton from '@components/stories/CloseButton';
import { Checkbox, FormControlLabel, Modal } from '@mui/material';

export default function ReadStoryGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [i, setI] = useState(1);
  const [interrupted, setInterrupted] = useState(false);

  const checkboxRef = useRef<HTMLInputElement>(null);

  const descriptions = [
    "You can zoom in and out of the map and click on countries to find stories.",
    "You can pick from continents or topics you are interested in!",
    "You can type in any keywords such as country or names!",
  ];

  useEffect(() => {
    if (!hasClosed()) {
      setIsOpen(true);
    }
    startSteps();
  }, []);

  const startSteps = () => {
    setTimeout(() => {
      if (i < 3 && !interrupted) {
        setI(i + 1);
      }
      if (!interrupted) {
        startSteps();
      }
    }, 6000);
  };

  const onStepClicked = (num: number) => {
    setInterrupted(true);
    setI(num);
  };

  const onClose = () => {
    if (checkboxRef.current?.checked) {
      localStorage.setItem("watched-map-guide", "true");
    }
    setIsOpen(false);
  };

  const hasClosed = () => {
    return localStorage.getItem("watched-map-guide") === "true";
  };

  return (
    <Modal open={isOpen} onClose={onClose} onBackdropClick={onClose}>
      <div className="guide" role="presentation">
        <div className="absolute right-5 top-5 text-black">
          <CloseButton onClick={onClose} />
        </div>
        <div className="gif">
          <img
            src="/assets/images/guide/map.gif"
            alt="Gif of how to use the map"
            style={{
              display: i === 1 ? "block" : "none",
            }}
          />
          <img
            style={{
              display: i === 2 ? "block" : "none",
            }}
            src="/assets/images/guide/filter.gif"
            alt="Gif of how to use the filter modal"
          />
          <img
            style={{
              display: i === 3 ? "block" : "none",
            }}
            src="/assets/images/guide/search.gif"
            alt="Gif of how to use the search box"
          />
        </div>
        <div className="header px-4 pt-4">
          <h3>How to Find Stories</h3>
        </div>
        <div className="description px-4">
          <ol>
            <li className={i === 1 ? "active" : ""}>
              <button onClick={() => onStepClicked(1)}>From Map</button>
            </li>
            <li className={i === 2 ? "active" : ""}>
              <button onClick={() => onStepClicked(2)}>From Filter</button>
            </li>
            <li className={i === 3 ? "active" : ""}>
              <button onClick={() => onStepClicked(3)}>From Search</button>
            </li>
          </ol>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "rgb(var(--color))",
                  "&.Mui-checked": {
                    color: "rgb(var(--accent))",
                  },
                }}
                defaultChecked
                size="medium"
              />
            }
            inputRef={checkboxRef}
            label="Don't show this again"
            className="absolute bottom-5 left-5 pl-4 max-md:bottom-12"
          />
          <p>{descriptions[i - 1]}</p>
        </div>
        <button
          className="next"
          onClick={() => {
            i < 3 ? setI(i + 1) : onClose();
          }}
        >
          {i < 3 ? "Next" : "Try it out"}
        </button>
      </div>
    </Modal>
  );
}

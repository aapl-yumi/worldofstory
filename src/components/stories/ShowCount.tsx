import "./ShowCount.scss";

import { useState } from "react";

import { Modal } from "@mui/material";

import CloseButton from "./CloseButton";

export default function ShowCount({ count }: { count: number }) {
  const [openAboutTheContentModal, setOpenAboutTheContentModal] =
    useState(false);

  return (
    <div className="w-full flex items-center justify-between my-4">
      <span className="text-2xl	font-bold">
        {count > 0 ? (
          <>
            Results:{" "}
            <span className="max-md:whitespace-nowrap">
              {count} {count + count === 1 ? "story" : "stories"}
            </span>
          </>
        ) : (
          <>No results</>
        )}
      </span>
      <button
        className="ml-4 text-base underline whitespace-nowrap"
        onClick={() => setOpenAboutTheContentModal(true)}
      >
        About the content
      </button>
      <Modal
        open={openAboutTheContentModal}
        onClose={() => setOpenAboutTheContentModal(false)}
        onBackdropClick={() => setOpenAboutTheContentModal(false)}
        aria-labelledby="About the content"
        aria-describedby="Notice about the contents on this website"
      >
        <div
          role="presentation"
          className="fixed vertical-scroll w-[500px] max-h-[95vh] max-w-[95vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-16 px-6 rounded-lg bg-[var(--background-light)]"
        >
          <div className="absolute top-4 right-4">
            <CloseButton onClick={() => setOpenAboutTheContentModal(false)} />
          </div>
          <h1 className="text-2xl text-center mb-4">About the content</h1>
          <div className="h-full w-full about-the-content">
            <p>
              *1 United Nations (UN) member countries follow the notation of the
              UN, while non-member countries follow International Olympic
              Committee (IOC) notation. However, some countries and divisions
              are regions may be displayed differently due to the author’s
              discretion. Continental and regional divisions are based on those
              by the UN.
            </p>
            <p>
              *2 Flags are based on the designs as of January 2023 from flag
              designs from Fathom.
            </p>
            <p>
              *3 The dreams featured were written by each country / region’s
              representatives between March 2020 and today. As we have
              prioritized each author’s individual form of expression, please be
              a ware that the text of this website features cases where the
              names of countries or regions differ from how it is displayed on
              the page, or may refer to specific regions as “countries”.
            </p>
            <p>
              *4 The representatives of each country / region were selected
              based on various criteria, including their respective sense of
              identity, which may refer to the country / region they currently
              live in and / or where they are / were a citizen.
            </p>
            <p>
              *5 The original sentences of the representative stories from the
              book “WE HAVE A DREAM” are different from that of the website.
            </p>
            <p>
              *6 Pictures are different from the ones in the book “WE HAVE A
              DREAM”.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

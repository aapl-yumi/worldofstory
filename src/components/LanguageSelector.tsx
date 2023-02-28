import { useEffect, useRef, useState } from "react";
import { Popover, Button, ButtonGroup } from "@mui/material";
import { Icon } from "@iconify/react";
import "./LanguageSelector.scss";

const languages: {
  langid: string;
  langinen: string;
  langinlang: string;
  languageTranslation: string;
  ready: boolean;
  notReadyMessage?: string;
}[] = [
  {
    langid: "en",
    langinen: "English",
    langinlang: "English",
    languageTranslation: "Language",
    ready: true,
  },
  {
    langid: "ja",
    langinen: "Japanese",
    langinlang: "日本語",
    languageTranslation: "言語",
    ready: false,
    notReadyMessage: "もうすぐ！",
  },
  {
    langid: "es",
    langinen: "Spanish",
    langinlang: "Español",
    languageTranslation: "Idioma",
    ready: false,
    notReadyMessage: "¡Pronto!",
  },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [languageIndex, setLanguageIndex] = useState(0);
  const anchorEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLanguageIndex((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onLanguageSelect = (language: string) => {
    const languageObj = languages.find((lang) => lang.langid === language);
    if (!languageObj?.ready) {
      alert(languageObj?.notReadyMessage);
      return;
    }
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "rgb(var(--color))" }}
        ref={anchorEl}
        disableRipple
      >
        {languages[languageIndex].languageTranslation}
        <Icon
          icon={
            isOpen
              ? "material-symbols:keyboard-arrow-up-rounded"
              : "material-symbols:keyboard-arrow-down-rounded"
          }
          style={{
            fontSize: "1.5rem",
          }}
        />
      </Button>
      <Popover
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="language-selector"
      >
        <ButtonGroup fullWidth orientation="vertical">
          {languages.map((language) => (
            <Button
              key={language.langid}
              onClick={() => onLanguageSelect(language.langid)}
              className={language.langid === selectedLanguage ? "selected" : ""}
              disableRipple
            >
              {language.langinlang}
              {language.ready ? null : (
                <span className="not-ready">Coming soon</span>
              )}
            </Button>
          ))}
        </ButtonGroup>
      </Popover>
    </>
  );
}

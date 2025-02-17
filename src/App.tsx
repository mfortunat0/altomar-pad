import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCircleStop } from "react-icons/fa6";
import logo from "./assets/logoBackground.png";
import logoLightHouse from "./assets/logoBackgroundLighthouse.png";
import logoStorm from "./assets/logoBackgroundStorm.png";
import "./App.css";
import {
  Atmosphere,
  cifraBemol,
  cifraSustenido,
  nomenclatura,
} from "./utils/imports";

import srcAudio from "./assets/A-Atmosphere.wav";

interface Theme {
  logoUrl: string;
  classContainer: string;
}

type Tons =
  | "c"
  | "cSus"
  | "d"
  | "dSus"
  | "e"
  | "f"
  | "fSus"
  | "g"
  | "gSus"
  | "a"
  | "aSus"
  | "b";

function App() {
  let audioCtx: AudioContext;
  let track: MediaElementAudioSourceNode;

  const [gainNode, setGainNode] = useState<GainNode>();
  const [audioElement, setAudioElement] = useState<HTMLMediaElement>();
  const [selectedTimbre, setSelectedTimbre] = useState("Atmosphere");
  const [selectedTheme, setSelectedTheme] = useState("0");
  const [lockButtons, setLockButtons] = useState(false);
  const [activeTom, setActiveTom] = useState("");
  const [language, setLanguage] = useState<
    "bemol" | "sustenido" | "nomenclatura"
  >("sustenido");

  const themes: Theme[] = [
    {
      logoUrl: logo,
      classContainer: "altomarMain",
    },
    {
      logoUrl: logoLightHouse,
      classContainer: "lightHouseMain",
    },
    {
      logoUrl: logoStorm,
      classContainer: "stormMain",
    },
  ];

  const languages = {
    sustenido: cifraSustenido,
    bemol: cifraBemol,
    nomenclatura: nomenclatura,
  };

  useEffect(() => {
    const interval = setInterval(() => {}, 4000);
    return () => clearInterval(interval);
  }, []);

  const onChangeSelectedTimbre = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimbre(event.target.value);
  };

  const onChangeSelectedTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  const onChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    if (
      newValue === "sustenido" ||
      newValue === "bemol" ||
      newValue === "nomenclatura"
    ) {
      setLanguage(newValue);
    }
  };

  const stopAudio = () => {
    if (audioElement && gainNode) {
      audioElement.pause();
      audioElement.currentTime = 0;
      gainNode.gain.value = -1;
    }
  };

  const fadeOut = () => {
    return new Promise((resolve) => {
      setLockButtons(true);
      if (gainNode) {
        gainNode.gain.value = 1;
      }
      const interval = setInterval(() => {
        if (gainNode) {
          if (gainNode.gain.value > -1) {
            gainNode.gain.value -= 0.08;
          } else {
            clearInterval(interval);
            setLockButtons(false);
            resolve("");
          }
        }
      }, 100);
    });
  };

  const fadeIn = async (tom: Tons) => {
    return new Promise((resolve) => {
      setLockButtons(true);
      audioCtx = new AudioContext();
      const tempAudioElement = document.createElement(
        "audio"
      ) as HTMLMediaElement;
      tempAudioElement.src = Atmosphere[tom];
      track = audioCtx.createMediaElementSource(tempAudioElement);
      track.connect(audioCtx.destination);
      const tempNode = audioCtx.createGain();
      track.connect(tempNode).connect(audioCtx.destination);
      tempNode.gain.value = -1;
      tempAudioElement.play();
      tempAudioElement.loop = true;
      const interval = setInterval(() => {
        if (tempNode.gain.value < 1) {
          tempNode.gain.value += 0.08;
        } else {
          setGainNode(tempNode);
          setAudioElement(tempAudioElement);
          clearInterval(interval);
          setLockButtons(false);
          resolve("");
        }
      }, 100);
    });
  };

  const onSelectedTom = async (tom: Tons) => {
    if (activeTom) {
      if (audioElement?.paused) {
        await fadeIn(tom);
      } else {
        await fadeOut();
        setActiveTom(tom);
        await fadeIn(tom);
      }
    } else {
      await fadeIn(tom);
      setActiveTom(tom);
    }
  };

  return (
    <main className={themes[Number(selectedTheme)].classContainer}>
      {/* <img src={themes[Number(selectedTheme)].logoUrl} alt="" /> */}
      <section>
        <select value={selectedTimbre} onChange={onChangeSelectedTimbre}>
          <option value="Atmosphere">Atmosphere</option>
        </select>
        <div>
          <button
            disabled={lockButtons}
            className={activeTom === "c" ? "activeButton" : ""}
            onClick={() => onSelectedTom("c")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][0]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "cSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("cSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][1]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "d" ? "activeButton" : ""}
            onClick={() => onSelectedTom("d")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][2]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "dSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("dSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][3]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "e" ? "activeButton" : ""}
            onClick={() => onSelectedTom("e")}
            style={{
              width: language === "nomenclatura" ? "84%" : "",
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][4]}
          </button>
          <br />
          <button
            disabled={lockButtons}
            className={activeTom === "f" ? "activeButton" : ""}
            onClick={() => onSelectedTom("f")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][5]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "fSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("fSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][6]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "g" ? "activeButton" : ""}
            onClick={() => onSelectedTom("g")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][7]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "gSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("gSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][8]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "a" ? "activeButton" : ""}
            onClick={() => onSelectedTom("a")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][9]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "aSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("aSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][10]}
          </button>
          <button
            disabled={lockButtons}
            className={activeTom === "b" ? "activeButton" : ""}
            onClick={() => onSelectedTom("b")}
            style={{
              width: language === "nomenclatura" ? "84%" : "",
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][11]}
          </button>
        </div>
        <footer>
          <div>
            <button
              disabled={lockButtons}
              className="stopButton"
              onClick={stopAudio}
            >
              <FaCircleStop />
            </button>
            <select value={language} onChange={onChangeLanguage}>
              <option value="sustenido">Sustenido - #</option>
              <option value="bemol">Bemol - b</option>
              <option value="nomenclatura">Nomenclatura</option>
            </select>
          </div>
          <div>
            <label htmlFor="theme">Thema</label>
            <select
              name=""
              id="theme"
              value={selectedTheme}
              onChange={onChangeSelectedTheme}
            >
              <option value="0">Altomar</option>
              <option value="1">LightHouse</option>
              <option value="2">Storm</option>
            </select>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;

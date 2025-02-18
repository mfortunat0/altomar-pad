import "./App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCircleStop } from "react-icons/fa6";
import logo from "./assets/logoBackground.png";
import logoLightHouse from "./assets/logoBackgroundLighthouse.png";
import logoStorm from "./assets/logoBackgroundStorm.png";
import { Atmosphere } from "./utils/Atmosphere";
import { Angels } from "./utils/Angels";
import { Sky } from "./utils/Sky";
import { Basic } from "./utils/Basic";
import { Flanger } from "./utils/Flanger";
import { FlangerMenor } from "./utils/FlangerMenor";
import { Sino } from "./utils/Sino";
import { SinoMenor } from "./utils/SinoMenor";
import { Soft } from "./utils/Soft";
import { SoftMenor } from "./utils/SoftMenor";
import { cifraBemol, cifraSustenido, nomenclatura, Tons } from "./utils/config";

interface Theme {
  logoUrl: string;
  classContainer: string;
}

function App() {
  let audioCtx: AudioContext;
  let track: MediaElementAudioSourceNode;

  const [gainNode, setGainNode] = useState<GainNode>();
  const [audioElement, setAudioElement] = useState<HTMLMediaElement>();
  const [selectedTimbre, setSelectedTimbre] = useState("Basic");
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
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    if (gainNode) {
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
          if (gainNode.gain.value > -1.2) {
            gainNode.gain.value -= 0.2;
          } else {
            if (audioElement) {
              audioElement.pause();
              audioElement.currentTime = 0;
            }
            clearInterval(interval);
            setLockButtons(false);
            resolve("");
          }
        }
      }, 100);
    });
  };

  const fadeIn = async (tom: Tons) => {
    return new Promise(async (resolve) => {
      setLockButtons(true);
      audioCtx = new AudioContext();

      const tempAudioElement = document.createElement(
        "audio"
      ) as HTMLMediaElement;

      switch (selectedTimbre) {
        case "Atmosphere":
          tempAudioElement.src = Atmosphere[tom];
          break;
        case "Angels":
          tempAudioElement.src = Angels[tom];
          break;
        case "Sky":
          tempAudioElement.src = Sky[tom];
          break;
        case "Basic":
          tempAudioElement.src = Basic[tom];
          break;
        case "Flanger":
          tempAudioElement.src = Flanger[tom];
          break;
        case "FlangerMenor":
          tempAudioElement.src = FlangerMenor[tom];
          break;
        case "Sino":
          tempAudioElement.src = Sino[tom];
          break;
        case "SinoMenor":
          tempAudioElement.src = SinoMenor[tom];
          break;
        case "Soft":
          tempAudioElement.src = Soft[tom];
          break;
        case "SoftMenor":
          tempAudioElement.src = SoftMenor[tom];
          break;
        default:
          tempAudioElement.src = Basic[tom];
          break;
      }

      track = audioCtx.createMediaElementSource(tempAudioElement);
      track.connect(audioCtx.destination);

      const tempNode = audioCtx.createGain();

      track.connect(tempNode).connect(audioCtx.destination);

      tempNode.gain.value = -1;
      await tempAudioElement.play();
      tempAudioElement.loop = true;

      const interval = setInterval(() => {
        if (tempNode.gain.value < 1) {
          tempNode.gain.value += 0.12;
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
    try {
      if (activeTom) {
        if (audioElement?.paused) {
          setActiveTom(tom);
          await fadeIn(tom);
        } else {
          await fadeOut();
          setActiveTom(tom);
          await fadeIn(tom);
        }
      } else {
        setActiveTom(tom);
        await fadeIn(tom);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={themes[Number(selectedTheme)].classContainer}>
      {/* <img src={themes[Number(selectedTheme)].logoUrl} alt="" /> */}
      <section>
        <select value={selectedTimbre} onChange={onChangeSelectedTimbre}>
          <option value="Basic">Basic</option>
          <option value="Atmosphere">Atmosphere</option>
          <option value="Angels">Angels</option>
          <option value="Sky">Sky</option>
          <option value="Flanger">Flanger</option>
          <option value="Sino">Sino</option>
          <option value="Soft">Soft</option>
          <option value="FlangerMenor">FlangerMenor</option>
          <option value="SinoMenor">SinoMenor</option>
          <option value="SoftMenor">SoftMenor</option>
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

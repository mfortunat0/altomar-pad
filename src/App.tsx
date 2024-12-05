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
  let audioElement: HTMLAudioElement;
  let source: MediaElementAudioSourceNode;

  const [gainNode, setGainNode] = useState<GainNode>();
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

  const onChangeSelectedTimbre = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimbre(event.target.value);
  };

  const onChangeSelectedTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
  };

  const stopAudio = () => {};

  const fadeOut = () => {
    return new Promise((resolve) => {
      let volume = 1;

      const interval = setInterval(() => {
        if (gainNode) {
          volume -= 0.02;
          gainNode.gain.value = volume;
          setGainNode(gainNode);
          if (volume < 0.1) {
            gainNode.gain.value = 0;
            setGainNode(gainNode);
            clearInterval(interval);
            resolve(null);
          }
        }
      }, 10050);
    });
  };

  const fadeIn = async (tom: Tons) => {
    return new Promise((resolve) => {
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (!audioElement) {
        audioElement = new Audio(Atmosphere[tom]);
        audioElement.loop = true;
      }

      if (audioElement) {
        if (audioElement.played) {
          audioElement = new Audio(Atmosphere[tom]);
        }
      }

      if (!source) {
        source = audioCtx.createMediaElementSource(audioElement);
      }

      if (!gainNode) {
        const newGainNode = audioCtx.createGain();
        console.log(newGainNode);
        setGainNode(newGainNode);
      }

      if (gainNode) {
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = 0;
        audioElement.play();
        let volume = 0;

        const interval = setInterval(() => {
          volume += 0.02;
          gainNode.gain.value = volume;
          setGainNode(gainNode);
          console.log(gainNode, "asdas");
          if (volume > 0.9) {
            gainNode.gain.value = 1;
            setGainNode(gainNode);
            clearInterval(interval);
            resolve(null);
          }
        }, 50);
      }
    });
  };

  const onSelectedTom = async (tom: Tons) => {
    if (activeTom) {
      await fadeOut();
      setActiveTom(tom);
      await fadeIn(tom);
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
            className={activeTom === "c" ? "activeButton" : ""}
            onClick={() => onSelectedTom("c")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][0]}
          </button>
          <button
            className={activeTom === "cSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("cSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][1]}
          </button>
          <button
            className={activeTom === "d" ? "activeButton" : ""}
            onClick={() => onSelectedTom("d")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][2]}
          </button>
          <button
            className={activeTom === "dSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("dSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][3]}
          </button>
          <button
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
            className={activeTom === "f" ? "activeButton" : ""}
            onClick={() => onSelectedTom("f")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][5]}
          </button>
          <button
            className={activeTom === "fSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("fSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][6]}
          </button>
          <button
            className={activeTom === "g" ? "activeButton" : ""}
            onClick={() => onSelectedTom("g")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][7]}
          </button>
          <button
            className={activeTom === "gSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("gSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][8]}
          </button>
          <button
            className={activeTom === "a" ? "activeButton" : ""}
            onClick={() => onSelectedTom("a")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][9]}
          </button>
          <button
            className={activeTom === "aSus" ? "activeButton" : ""}
            onClick={() => onSelectedTom("aSus")}
            style={{
              opacity: lockButtons ? "0.5" : "1",
            }}
          >
            {languages[language][10]}
          </button>
          <button
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
            <button className="stopButton" onClick={stopAudio}>
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

import AtmosphereC from "../assets/C-Atmosphere.wav";
import AtmosphereCsus from "../assets/Csus-Atmosphere.wav";
import AtmosphereD from "../assets/D-Atmosphere.wav";
import AtmosphereDsus from "../assets/Dsus-Atmosphere.wav";
import AtmosphereE from "../assets/E-Atmosphere.wav";
import AtmosphereF from "../assets/F-Atmosphere.wav";
import AtmosphereFsus from "../assets/Fsus-Atmosphere.wav";
import AtmosphereG from "../assets/G-Atmosphere.wav";
import AtmosphereGsus from "../assets/Gsus-Atmosphere.wav";
import AtmosphereA from "../assets/A-Atmosphere.wav";
import AtmosphereAsus from "../assets/Asus-Atmosphere.wav";
import AtmosphereB from "../assets/B-Atmosphere.wav";

const Atmosphere = {
  c: AtmosphereC,
  cSus: AtmosphereCsus,
  d: AtmosphereD,
  dSus: AtmosphereDsus,
  e: AtmosphereE,
  f: AtmosphereF,
  fSus: AtmosphereFsus,
  g: AtmosphereG,
  gSus: AtmosphereGsus,
  a: AtmosphereA,
  aSus: AtmosphereAsus,
  b: AtmosphereB,
};

const cifraSustenido = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const cifraBemol = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

const nomenclatura = [
  "Do",
  "Do sustenido | Re bemol",
  "Re",
  "Re sustenido | Mi bemol",
  "Mi",
  "Fa",
  "Fa sustenido | Sol bemol",
  "Sol",
  "Sol sustenido | La bemol",
  "La",
  "La sustenido | Si bemol",
  "Si",
];

export { Atmosphere, nomenclatura, cifraBemol, cifraSustenido };

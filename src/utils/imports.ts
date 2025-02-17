import AtmosphereC from "../assets/Atmosphere/C-Atmosphere.wav";
import AtmosphereCsus from "../assets/Atmosphere/Csus-Atmosphere.wav";
import AtmosphereD from "../assets/Atmosphere/D-Atmosphere.wav";
import AtmosphereDsus from "../assets/Atmosphere/Dsus-Atmosphere.wav";
import AtmosphereE from "../assets/Atmosphere/E-Atmosphere.wav";
import AtmosphereF from "../assets/Atmosphere/F-Atmosphere.wav";
import AtmosphereFsus from "../assets/Atmosphere/Fsus-Atmosphere.wav";
import AtmosphereG from "../assets/Atmosphere/G-Atmosphere.wav";
import AtmosphereGsus from "../assets/Atmosphere/Gsus-Atmosphere.wav";
import AtmosphereA from "../assets/Atmosphere/A-Atmosphere.wav";
import AtmosphereAsus from "../assets/Atmosphere/Asus-Atmosphere.wav";
import AtmosphereB from "../assets/Atmosphere/B-Atmosphere.wav";

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

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

export { nomenclatura, cifraBemol, cifraSustenido, Tons };

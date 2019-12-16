// Mock JSON data if this is running on a local file system
const colorJSON = `[
  {"name": "red", "hsl": "hsl(0, 100%, 50%)"},
  {"name": "blue", "hsl": "hsl(240, 100%, 50%)"},
  {"name": "purple", "hsl": "hsl(270, 100%, 50%)"}
]`;

// Helper functions
const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z"
];
const vowels = ["a", "e", "i", "o", "u"];

function generateRandomColorName() {
  let name =
    consonants[Math.floor(Math.random() * consonants.length)] +
    vowels[Math.floor(Math.random() * vowels.length)] +
    consonants[Math.floor(Math.random() * consonants.length)];
  if (Math.random() >= 0.5) {
    name +=
      vowels[Math.floor(Math.random() * vowels.length)] +
      consonants[Math.floor(Math.random() * consonants.length)];
  }
  if (Math.random() >= 0.5) {
    name +=
      vowels[Math.floor(Math.random() * vowels.length)] +
      consonants[Math.floor(Math.random() * consonants.length)];
  }
  return name;
}

function generateRandomColor() {
  return {
    name: generateRandomColorName(),
    hsl: `hsl(${Math.floor(Math.random() * 359)}, 100%, 50%)`
  };
}

function changeSaturation(hsl) {
  const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\)/g;
  const hslArray = regexp.exec(hsl).slice(1);
  const randomSaturation = Math.floor(Math.random() * 75 + 25);
  return `hsl(${hslArray[0]}, ${randomSaturation}%, ${hslArray[2]})`;
}

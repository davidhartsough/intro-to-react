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

const getRandomNumber = cap => Math.floor(Math.random() * cap);
const getRandomItem = arr => arr[getRandomNumber(arr.length)];
const getRandomConsonant = () => getRandomItem(consonants);
const getRandomVowel = () => getRandomItem(vowels);
const getRandomBool = () => Math.random() >= 0.5;
const getRandomPair = () => getRandomVowel() + getRandomConsonant();

function generateRandomColorName() {
  let name = Math.random() >= 0.3 ? getRandomConsonant() : getRandomPair();
  name += getRandomPair();
  if (getRandomBool()) {
    name += getRandomPair();
  }
  if (getRandomBool()) {
    name += getRandomPair();
  }
  return name;
}

function generateRandomColor() {
  return {
    name: generateRandomColorName(),
    hsl: `hsl(${getRandomNumber(359)}, 100%, 50%)`
  };
}

function changeSaturation(hsl) {
  const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\)/g;
  const hslArray = regexp.exec(hsl).slice(1);
  const randomSaturation = Math.floor(Math.random() * 75 + 25);
  return `hsl(${hslArray[0]}, ${randomSaturation}%, ${hslArray[2]})`;
}

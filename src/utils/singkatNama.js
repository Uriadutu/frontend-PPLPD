export function shortenName(fullName) {
  const words = fullName.split(" ");

  let shortenedName = words[0];
  for (let i = 1; i < words.length - 1; i++) {
    const initial = words[i].charAt(0) + ".";
    shortenedName += " " + initial;
  }

  shortenedName += " " + words[words.length - 1];

  return shortenedName;
}

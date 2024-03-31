export function parseAndFormatDateString(dateString) {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}
export function shortenName(fullName) {
  const words = fullName.split(" ");

  // If the name contains only one word, return it with the first letter capitalized
  if (words.length === 1) {
    return fullName.charAt(0).toUpperCase() + fullName.slice(1);
  }

  let shortenedName = words[0].charAt(0).toUpperCase() + words[0].slice(1); // Capitalize the first word

  for (let i = 1; i < words.length - 1; i++) {
    const initial = words[i].charAt(0).toUpperCase() + "."; // Capitalize the initial of each subsequent word
    shortenedName += " " + initial;
  }

  shortenedName +=
    " " +
    words[words.length - 1].charAt(0).toUpperCase() +
    words[words.length - 1].slice(1); // Capitalize the last word

  return shortenedName;
}


/**
 * Finds the index of the closing '}' that matches the '{' at position `openPos`
 * in `str`, accounting for nested braces. Returns -1 if no match is found.
 * This is needed so that default values containing '}' (e.g. URL templates like
 * `${VAR:-https://api.example.com/{id}}`) are parsed correctly.
 */
export function findClosingBrace(str: string, openPos: number): number {
  let depth = 1;
  for (let i = openPos + 1; i < str.length; i++) {
    if (str[i] === "{") {
      depth++;
    } else if (str[i] === "}") {
      if (--depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

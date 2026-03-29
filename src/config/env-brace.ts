/**
 * Finds the index of the closing '}' that matches the '{' at position `openPos`
 * in `str`, accounting for nested braces and skipping quoted strings.
 * Returns -1 if no match is found.
 *
 * Quoted strings (double or single) are treated as opaque — braces inside them
 * do not affect depth. This prevents e.g. `${VAR:-{"key":"}"}}` from
 * mis-identifying the `}` inside `"}"` as the structural closing brace.
 */
export function findClosingBrace(str: string, openPos: number): number {
  let depth = 1;
  for (let i = openPos + 1; i < str.length; i++) {
    const ch = str[i];
    // Skip quoted strings — braces inside them are not structural
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      while (i < str.length && str[i] !== quote) {
        if (str[i] === "\\") {
          i++;
        } // skip escaped char
        i++;
      }
      // i now points at the closing quote (or past end); loop increment advances past it
      continue;
    }
    if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      if (--depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

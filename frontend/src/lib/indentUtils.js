export const INDENT_STEP_SPACES = 4;

export const levelToSpaces = (level) => level * INDENT_STEP_SPACES;
export const spacesToLevel = (spaces) => Math.floor(spaces / INDENT_STEP_SPACES);

export const formatPythonCode = (lines, indentMap) => {
  return lines.map(line => {
    const indent = ' '.repeat(levelToSpaces(indentMap[line.id] || 0));
    return `${indent}${line.content}`;
  }).join('\n');
};

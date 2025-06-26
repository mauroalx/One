
const stringToColor = (str: string, isDark: boolean): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const saturation = 65 + (Math.abs(hash) % 20);
  const lightness = isDark 
    ? 62 + (Math.abs(hash) % 10)  // mais forte no dark
    : 45 + (Math.abs(hash) % 10); // mais suave no light
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const applyMask = (value: string, mask: string): string => {
  let i = 0;
  const numeric = value.replace(/\D/g, '');
  return mask.replace(/9/g, () => numeric[i++] ?? '');
};

export {
  stringToColor,
  applyMask
};

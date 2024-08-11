/**
 * for visibility purposes, some of the todo structure colors
 * will always be an darker version of the todo color
 */
export default function generateDarkerHex(color: string) {
  const newColor = color.replace(/^#/, "");

  let r = parseInt(newColor.substring(0, 2), 16);
  let g = parseInt(newColor.substring(2, 4), 16);
  let b = parseInt(newColor.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, r * 0.8));
  g = Math.max(0, Math.min(255, g * 0.8));
  b = Math.max(0, Math.min(255, b * 0.8));

  return (
    "#" +
    [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
  );
}

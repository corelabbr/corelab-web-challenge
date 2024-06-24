export type CustomColorKey =
  | "lightBlue"
  | "lightGreen"
  | "lightYellow"
  | "lightOrange"
  | "lightRed"
  | "skyBlue"
  | "lightPurple"
  | "limeGreen"
  | "coral"
  | "lightGray"
  | "mediumGray"
  | "beige";

const customColors: Record<CustomColorKey, string> = {
  lightBlue: "#BAE2FF",
  lightGreen: "#B9FFDD",
  lightYellow: "#FFE8AC",
  lightOrange: "#FFCAB9",
  lightRed: "#F99494",
  skyBlue: "#9DD6FF",
  lightPurple: "#ECA1FF",
  limeGreen: "#DAFF8B",
  coral: "#FFA285",
  lightGray: "#CDCDCD",
  mediumGray: "#979797",
  beige: "#A99A7C"
};

export default customColors;

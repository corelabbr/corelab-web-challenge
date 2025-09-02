export interface FormColor {
  blue: "#e6f3ff";
  yellow: "#fffacd";
  orange: "#fff4e6";
  green: "#f0fff4";
}

export type FormColorKey = keyof FormColor;

export type FormColorValue = FormColor[keyof FormColor];

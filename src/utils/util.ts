import * as cs from "color-stepper";
import iro from "@jaames/iro";

export const strHexTo16Bit = (hexStr: string): number => {
  return (parseInt(hexStr.substr(1), 16) << 8) / 256;
};

export const genColorGradients = (gradients: string[], size: number): HexColorString[] => {
  if (gradients.length === 0 || size === 0) return [];
  return cs.generateSteps(
    gradients.map((c) => c.slice(1)),
    size
  );
};

export function randomColor(): HexColorString {
  const color = ("#" + ((Math.random() * 0xffffff) << 0).toString(16)) as HexColorString;
  return color.length !== 7 ? randomColor() : color;
}

export function getGradientCss(list: string[]): GradientCSS {
  const stops = list.map((item, index, list) => `${item} ${((100 / list.length) * index).toFixed(2)}%`);
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

export function getTextShadowHsl(hex: HexColorString): HslColor {
  const color = new iro.Color(hex);
  const hsv = { h: color.hsv.h ?? 0, s: color.hsv.s ?? 0, v: color.hsv.v ?? 0 };

  const h = Math.round(hsv.h);
  const s = Math.round(hsv.s);
  const l = Math.round(hsv.v / 4);

  return { h, s, l };
}

export function getTextShadowHex(hex: HexColorString): HexColorString {
  return new iro.Color(getTextShadowHsl(hex)).hexString as HexColorString;
}

export function rgbToHex(rgb: Record<"r" | "g" | "b", number>): HexColorString {
  const color = new iro.Color(rgb);
  return color.hexString as HexColorString;
}

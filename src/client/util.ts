import { unescape } from "lodash";

export interface LinkPair {
  title: string;
  subtitle?: string;
  link: string;
}

export const fullUnescape = (x: string | number) =>
  typeof x === "string" ? unescape(x).replace(/&#039;/g, "'") : x;

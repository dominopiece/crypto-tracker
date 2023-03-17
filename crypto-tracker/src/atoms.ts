import { Dispatch } from "react";
import { atom } from "recoil";

export interface IIsDarktype {
  isDark: boolean;
  setIsDark: Dispatch<React.SetStateAction<boolean>>;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

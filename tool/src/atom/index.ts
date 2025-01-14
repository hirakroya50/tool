import { atom } from "jotai";

export const count = atom(0);

export const userLoginStatus = atom<boolean>(false);

export const userAccessToken = atom<string | null>(null);

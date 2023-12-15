import { create } from "zustand";
import jwt_decode from "jwt-decode";
import Config from "config";

const userDefault = {
  aud: "",
  azp: "",
  email: "",
  email_verified: false,
  exp: 0,
  family_name: "",
  given_name: "",
  iat: 0,
  iss: "",
  jti: "",
  name: "",
  nbf: 0,
  picture: "",
  sub: "",
};

interface UserInfo {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

interface User {
  token: string;
  setToken(token: string): void;
  clearToken(): void;
}

export const getUser = (token: string): UserInfo => {
  try {
    const user = jwt_decode(token) as UserInfo;
    return user;
  } catch (e) {
    console.log(e);
    window.location.href = "/login";
    return userDefault;
  }
};

export const useUser = create<User>((set) => ({
  token: localStorage.getItem(Config.MENSCH_TOKEN_KEY) || "",
  user: userDefault,
  setToken: (token: string) => {
    localStorage.setItem(Config.MENSCH_TOKEN_KEY, token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem(Config.MENSCH_TOKEN_KEY);
    set({ token: "" });
  },
}));

import { atom } from "recoil";

export const toDoState = atom<number[]>({
  key: "toDo",
  default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // default: [],
});

export const homeSplashState = atom<boolean>({
  key: "homeSplash",
  default: true,
});

export interface IUserObjProps {
  userObj: any;
}

export const userObjState = atom<IUserObjProps | null>({
  key: "userObjState",
  default: null,
});

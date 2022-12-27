import { Blue, Red } from "../Styles/Colors";

export interface IUserObjProps {
  userObj: any;
}

type statusNameType = {
  [key: string]: string;
};
export const statusName: statusNameType = {
  start: "진행중",
  success: "완료",
  fail: "실패",
};

type statusColorType = {
  [key: string]: string;
};
export const statusColor: statusColorType = {
  start: "black",
  success: Blue,
  fail: Red,
};

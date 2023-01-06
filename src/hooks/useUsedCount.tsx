import { ItimeState } from "../Utils/interface";

export const useUsedCount = (isBreak: boolean, timerObj: ItimeState) => {
  const totalFocusSetCount = timerObj.setFocusMin * 60 + timerObj.setFocusSec;
  const totalFocusNowCount = timerObj.min * 60 + timerObj.sec;
  const totalBreakSetCount = timerObj.setBreakMin * 60 + timerObj.setBreakSec;
  const totalBreakNowCount = timerObj.breakMin * 60 + timerObj.breakSec;

  const endFullCount =
    totalFocusSetCount * (timerObj.setFocusSet - timerObj.focusSet) +
    totalBreakSetCount * (timerObj.setBreakSet - timerObj.breakSet);

  const doneUsedCount =
    totalFocusSetCount * timerObj.setFocusSet +
    totalBreakSetCount * timerObj.setBreakSet;
  const nextUsedCount = isBreak
    ? totalBreakSetCount + endFullCount
    : totalFocusSetCount + endFullCount;
  const usedCount = isBreak
    ? totalBreakSetCount - totalBreakNowCount + endFullCount
    : totalFocusSetCount - totalFocusNowCount + endFullCount;

  return { doneUsedCount, nextUsedCount, usedCount };
};

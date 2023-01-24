import { dbService } from "../../firebase";
import { useState } from "react";

export async function getSuccessPercent(
  todoId: string | undefined,
  date: string
) {
  const defaultResult = { successPercent: 0 };
  const Moment = require("moment");
  const now = Moment();

  try {
    await dbService
      .collection("plan")
      .doc(todoId)
      .collection("timer")
      .where("date", "==", date)
      .get()
      .then((result) => {
        // 타이머없으면 빈 객체 리턴
        if (result.empty) {
          return defaultResult;
        }
        // 타이머있으면 timerResult에 저장
        result.forEach((result) => {
          const isNotFinish =
            result.data().date !== Moment(now).format("YYYY-MM-DD") &&
            result.data().endTime === "";

          //defaultResult 저장
          if (result.data().status === "fail" || isNotFinish) {
            return defaultResult;
          }
          //timerResult 저장
          const endTimeMoment = Moment(
            result.data().endTime === ""
              ? Moment(now).format("YYYY-MM-DD HH:mm:ss")
              : result.data().endTime
          );
          const startTimeMoment = Moment(result.data().startTime);
          const usedCount = result.data().usedCount;
          //총시간
          const totalCount = Moment.duration(
            endTimeMoment.diff(startTimeMoment)
          ).asSeconds();
          //초과한 시간
          const overTime = totalCount - usedCount;
          const focusPercentValue = 100 - Math.round((overTime / 9000) * 100);
          //시간조작시 에러방지
          const focusPercent = () => {
            if (100 <= focusPercentValue) {
              return 100;
            } else if (focusPercentValue <= 0) {
              return 0;
            } else {
              return focusPercentValue;
            }
          };
          //성공확률 리턴
          return { successPercent: focusPercent() };
        });
      });
  } catch {
    alert("Timer 오류");
  }
}

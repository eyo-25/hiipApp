import { useRecoilState } from "recoil";
import styled from "styled-components";
import { feedBackTimerState, feedBackTodoState } from "../../Recoil/atoms";
import CoachBoard from "./CoachBoard/CoachBoard";
import MyBoard from "./MyBoard/MyBoard";
import SuccessBoard from "./SuccessBoard/SuccessBoard";
import { useEffect, useState, useRef } from "react";
import { dbService } from "../../firebase";
import { IoEllipse } from "react-icons/io5";

function FeedBackBorad() {
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  const [timerArray, setTimerArray] = useRecoilState<any[]>(feedBackTimerState);
  const [weekArray, setWeekArray] = useState<string[]>([]);
  const [nowTimer, setNowTimer] = useState<any>();
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");
  const noneCount = useRef<any>(0);
  const startDate = useRef<string>("");

  async function getFailPercentArray() {
    try {
      weekArray.forEach((weekDate, index) => {
        dbService
          .collection("plan")
          .doc(feedBackTodo[0].id)
          .collection("timer")
          .where("date", "==", weekDate)
          .get()
          .then((result) => {
            setTimerArray((prev) => {
              //deep copy
              const copyArray: any[] = [...prev];
              //결과 분류
              if (weekDate <= Moment().format("YYYY-MM-DD")) {
                if (!result.empty) {
                  result.forEach((resultData) => {
                    if (
                      resultData.data().date ===
                      Moment(now.current).format("YYYY-MM-DD")
                    ) {
                      setNowTimer(resultData.data());
                    }

                    const isSuccess = resultData.data().status === "success";
                    const successCount = isSuccess
                      ? resultData.data().successCount + 1
                      : resultData.data().successCount;
                    const startTimeMoment = Moment(feedBackTodo[0].startDate);
                    const endTimeMoment = Moment(resultData.data().date);
                    //진행한 날짜 기간
                    const progressDuration = () => {
                      const duration = Moment.duration(
                        endTimeMoment.diff(startTimeMoment)
                      ).asDays();
                      if (0 <= duration) {
                        return duration;
                      } else {
                        return 0;
                      }
                    };
                    const failPercentValue = Math.round(
                      (successCount / (progressDuration() + 1)) * 100
                    );

                    //시간 조작으로 인한 에러방지
                    const failPercent = () => {
                      if (100 <= failPercentValue) {
                        return 100;
                      } else if (failPercentValue <= 0) {
                        return 0;
                      } else {
                        return failPercentValue;
                      }
                    };
                    //배열에 할당
                    copyArray.splice(index, 1, {
                      successPercent: failPercent(),
                      date: weekDate,
                    });

                    //result.empty 배열 할당
                    for (let i = 1; i < noneCount.current + 1; i++) {
                      const successCount = resultData.data().successCount;

                      const startTimeMoment = Moment(startDate.current);
                      const endTime = Moment(resultData.data().date)
                        .subtract(i, "d")
                        .format("YYYY-MM-DD");
                      const endTimeMoment = Moment(endTime);
                      //진행한 날짜 기간
                      const progressDuration = () => {
                        const duration = Moment.duration(
                          endTimeMoment.diff(startTimeMoment)
                        ).asDays();
                        if (0 <= duration) {
                          return duration;
                        } else {
                          return 0;
                        }
                      };
                      const failPercentValue = Math.round(
                        (successCount / (progressDuration() + 1)) * 100
                      );

                      //시간 조작으로 인한 에러방지
                      const failPercent = () => {
                        if (100 <= failPercentValue) {
                          return 100;
                        } else if (failPercentValue <= 0) {
                          return 0;
                        } else {
                          return failPercentValue;
                        }
                      };

                      copyArray.splice(index - i, 1, {
                        successPercent: failPercent(),
                        ...copyArray[index - i],
                      });
                    }
                  });
                  noneCount.current = 0;
                } else if (result.empty) {
                  if (weekDate === now) {
                    //가장최근 timer가져와서 일차이에서 더해서 비율구함
                  } else {
                    noneCount.current = noneCount.current + 1;
                    copyArray.splice(index, 1, {
                      successPercent: 0,
                      date: weekDate,
                    });
                  }
                }
              } else {
                //배열에 할당
                copyArray.splice(index, 1, {
                  successPercent: 0,
                  date: weekDate,
                });
              }
              return [...copyArray];
            });
          });
      });
    } catch {
      alert("a");
    }
  }

  useEffect(() => {
    //week 초기화
    setWeekArray((prev) => {
      const copy = [...prev];
      let removeDay = 0;
      for (let index = Moment().day(); index >= 0; index--) {
        copy[index] = Moment().subtract(removeDay, "days").format("YYYY-MM-DD");
        removeDay++;
      }
      let addDay = 0;
      for (let index = Moment().day(); index < 7; index++) {
        copy[index] = Moment().add(addDay, "days").format("YYYY-MM-DD");
        addDay++;
      }
      return [...copy];
    });
  }, []);

  useEffect(() => {
    if (7 === weekArray.length && feedBackTodo[0].status !== "ready") {
      getFailPercentArray();
    }
    return () => {
      setTimerArray([
        { successPercent: 0 },
        { successPercent: 0 },
        { successPercent: 0 },
        { successPercent: 0 },
        { successPercent: 0 },
        { successPercent: 0 },
        { successPercent: 0 },
      ]);
    };
  }, [weekArray]);

  return (
    <Container>
      <CoachBoard />
      <SuccessBoard />
      <MyBoard />
    </Container>
  );
}

export default FeedBackBorad;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding-bottom: calc(var(--vh, 1vh) * 18);
  h2 {
    font-family: "Roboto";
    font-weight: 800;
    font-size: 8vh;
  }
  h3 {
    font-size: 2.5vh;
    font-weight: 600;
    line-height: 1.2;
  }
  span {
    font-family: "Roboto";
    font-weight: 800;
    font-size: 5vh;
  }
`;

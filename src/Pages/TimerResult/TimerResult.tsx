import styled from "styled-components";
import { Dark_Gray3, Dark_Gray4, Normal_Gray2 } from "../../Styles/Colors";
import Background from "../../Assets/image/result_success.png";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dbService } from "../../firebase";
import TimerGraph from "./TimerGraph";

function TimerResult() {
  const [startX, setStartX] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [isPush, setIsPush] = useState(false);
  const [timerArray, setTimerArray] = useState<any[]>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [weekArray, setWeekArray] = useState<string[]>([]);
  const [toDo, setToDo] = useState<any>();
  const params = useParams();
  const todoId = params.todoId;
  const Moment = require("moment");
  const navigate = useNavigate();
  const now = Moment().format("YYYY-MM-DD");

  const btnVarients = {
    normal: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    animate: {
      backgroundColor: isPush ? "rgba(255,255,255,1)" : "rgba(0,0,0,0)",
      color: isPush ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };

  //날짜에 해당하는 timerObj 배정
  async function getTimerArray(i: number) {
    try {
      await dbService
        .collection("plan")
        .doc(todoId)
        .collection("timer")
        .where("date", "==", weekArray[i])
        .get()
        .then((result) => {
          result.forEach((result) => {
            if (result.data().date === now) {
              setToDo(result.data());
            }
            setTimerArray((prev) => {
              //deepCopy
              const copyArray: any[] = [...prev];
              //한세트 총 count
              const setTotalCount =
                result.data().setFocusMin * 60 + result.data().setFocusSec;
              //전체세트 총 count
              const totalSetCount = setTotalCount * result.data().setFocusSet;
              //진행한 count
              const totalPlayCount =
                setTotalCount *
                  (result.data().setFocusSet - result.data().focusSet) +
                (setTotalCount - (result.data().min * 60 + result.data().sec));
              //배열에 할당
              copyArray.splice(i, 1, {
                successPercent: Math.round(
                  (totalPlayCount /
                    (0 < result.data().focusSet
                      ? totalSetCount
                      : totalPlayCount)) *
                    100
                ),
              });
              return [...copyArray];
            });
          });
        });
    } catch {
      alert("Timer 오류");
    }
  }

  useEffect(() => {
    setWeekArray((prev) => {
      const copy = [...prev];
      // 앞 배열 채우기
      let removeDay = 0;
      for (let index = Moment().day(); index >= 0; index--) {
        copy[index] = Moment().subtract(removeDay, "days").format("YYYY-MM-DD");
        removeDay++;
      }
      let addDay = 0;
      // 뒷 배열 채우기
      for (let index = Moment().day(); index < 7; index++) {
        copy[index] = Moment().add(addDay, "days").format("YYYY-MM-DD");
        addDay++;
      }
      return [...copy];
    });
  }, []);

  useEffect(() => {
    if (7 === weekArray.length) {
      for (let i = 0; i < weekArray.length; i++) {
        getTimerArray(i);
      }
    }
  }, [weekArray]);

  // 브라우저 스와이프
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsPush(false);
    setDistanceX(0);

    if (120 < e.clientX - startX) {
      navigate(`/feedback`);
    }
  };
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsPush(true);
    setDistanceX(0);
    setStartX(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isPush) {
      setDistanceX(e.clientX - startX);
    }
  };
  const onMouseLeave = () => {
    setDistanceX(0);
    setIsPush(false);
  };

  return (
    <Container>
      <TopWrapper>
        <TopContainer>
          <PrevIcon onClick={() => navigate(`/timer/${todoId}`)} />
          <ResultText>
            성공을 맛 봤으니
            <br />
            꾸준함을 맛볼 차례다.
          </ResultText>
        </TopContainer>
        <BackgroundImg />
      </TopWrapper>
      <BottomWrapper>
        <ResultInfoContainer>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>30%</h4>
            <p>계획진행</p>
          </ResultInfoBox>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>{toDo && toDo.setFocusSet}SET</h4>
            <p>진행세트</p>
          </ResultInfoBox>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>{toDo && toDo.addSet}SET</h4>
            <p>추가세트</p>
          </ResultInfoBox>
        </ResultInfoContainer>
        <ResultGraphWrapper>
          <TimerGraph timerArray={timerArray} weekArray={weekArray} />
        </ResultGraphWrapper>
        <PushBarWrapper>
          <PushBarContainer
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <PushTextBox>{!isPush && "밀어서 인터벌 결과 적용"}</PushTextBox>
            <PushButton
              variants={btnVarients}
              initial="normal"
              animate="animate"
              style={{ left: distanceX + "px" }}
            >
              홈
            </PushButton>
          </PushBarContainer>
        </PushBarWrapper>
      </BottomWrapper>
    </Container>
  );
}

export default TimerResult;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 414px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  z-index: 20;
`;
const TopWrapper = styled.div`
  position: relative;
  height: 30%;
  background-color: black;
`;
const TopContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  z-index: 10;
`;
const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.5;
`;
const PrevIcon = styled(IoChevronBackSharp)`
  height: 24px;
  width: 24px;
  color: white;
  margin-top: 2.5vh;
  cursor: pointer;
`;
const ResultText = styled.div`
  color: white;
  font-size: 3.2vh;
  letter-spacing: -0.5px;
  line-height: 1.5;
  font-weight: 900;
  margin-bottom: 7vh;
`;
const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 75%;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  background-color: ${Normal_Gray2};
  width: 100%;
  padding: 6vh 24px 7vh 24px;
`;
const ResultInfoContainer = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  padding-bottom: 3vh;
`;
const ResultInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 5%;
  border-radius: 7px;
  background-color: white;
  padding: 1.8vh;
  &:last-child {
    margin-right: 0;
  }
  h4 {
    margin-top: 1.2vh;
    font-weight: 900;
    font-size: 2.8vh;
  }
  p {
    margin-top: 1.4vh;
    color: ${Dark_Gray3};
    font-weight: 500;
    font-size: 1.5vh;
  }
`;
const NewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 30px;
  height: 3vh;
  border-radius: 10px;
  color: white;
  font-size: 1vh;
`;
const ResultGraphWrapper = styled.div`
  height: 65%;
  width: 100%;
  border-radius: 7px;
  padding-bottom: 3vh;
`;
const PushBarWrapper = styled.div`
  height: 10%;
  width: 100%;
`;
const PushBarContainer = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 7px;
  height: 100%;
  width: 100%;
  padding: 1vh;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1),
    70%,
    rgba(0, 2, 255, 1)
  );
  cursor: pointer;
`;
const PushTextBox = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${Dark_Gray4};
  font-size: 1.6vh;
`;
const PushButton = styled(motion.div)`
  position: absolute;
  left: 0;
  margin-left: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.5vh;
  min-width: 45px;
  height: 4.5vh;
  font-size: 1.6vh;
  border-radius: 0.8vh;
  border: 0.5px solid white;
  color: white;
`;

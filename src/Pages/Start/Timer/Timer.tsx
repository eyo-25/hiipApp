import { useRecoilState } from "recoil";
import TimerSplash from "../../../Component/TimerSplash";
import {
  isBreakState,
  isPauseState,
  timerSplashState,
  timeState,
} from "../../../Recoil/atoms";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../../../firebase";
import { motion } from "framer-motion";
import IntervalTimer from "./Timer/IntervalTimer";
import BreakTimer from "./Timer/BreakTimer";
import styled from "styled-components";
import Background from "../../../Assets/image/bull.png";

const bottomVariants = {
  normal: {
    opacity: 0,
    height: "0",
  },
  animate: {
    opacity: 1,
    height: "80%",
    transition: {
      delat: 0.1,
      duration: 1,
      type: "linear",
    },
  },
};

function Timer() {
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const params = useParams();
  const todoId = params.todoId;

  //타이머 get함수
  async function getTimeObj() {
    try {
      await dbService
        .collection("plan")
        .doc(`${todoId}`)
        .collection("timer")
        .doc("time")
        .get()
        .then((result: any) => {
          setTimeObj(result.data());
          if (
            result.data().breakSet >= result.data().focusSet &&
            result.data().focusSet !== 0
          ) {
            setIsBreakSet(true);
          } else {
            setIsBreakSet(false);
          }
        });
    } catch (e) {
      alert("Timer를 불러오는데 오류가 발생하였습니다. 다시 시도하여 주세요");
    }
  }

  useEffect(() => {
    getTimeObj();
    setIsPause(false);
    return () => {
      setIsTimerSplash(true);
      setIsBreakSet(false);
    };
  }, []);
  if (isTimerSplash) {
    return <TimerSplash />;
  }
  return (
    <Container>
      {!isBreakSet && <IntervalTimer />}
      {isBreakSet && <BreakTimer />}
      <BottomGradient
        variants={bottomVariants}
        initial="normal"
        animate="animate"
        iscolor={isPause ? "Red" : "Blue"}
      />
      <BackgroundImg />
    </Container>
  );
}

export default Timer;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 414px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 20;
`;
const BackgroundImg = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;
const BottomGradient = styled(motion.div)<{ iscolor: string }>`
  z-index: 5;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    70%,
    ${(props) => props.iscolor}
  );
`;

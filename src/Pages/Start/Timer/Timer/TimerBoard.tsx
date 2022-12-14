import { useRecoilState } from "recoil";
import styled from "styled-components";
import { counterState, timeState } from "../../../../Recoil/atoms";
import IntervalTimer from "../IntervalTimer/IntervalTimer";
import Background from "../../../../Assets/image/bull.png";
import { motion } from "framer-motion";
import TimerButton from "./TimerButton";
import { useEffect } from "react";
import { useCounter } from "../../../../hooks/useCounter";

const bottomVariants = {
  normal: {
    opacity: 0,
    height: "0",
  },
  animate: {
    opacity: 1,
    height: "100%",
    transition: {
      delay: 0.1,
      duration: 0.8,
      type: "linear",
    },
  },
};

function TimerBoard() {
  const [timeObj, setTimeObj] = useRecoilState(timeState);
  const [counterStatus, setCounterStatus] = useRecoilState(counterState);
  const { count, start, stop, reset, done } = useCounter(
    timeObj.min,
    timeObj.sec
  );

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <Container>
      <ContentsWrapper>
        <IntervalTimer count={count} start={start} />
      </ContentsWrapper>
      <ButtonWrapper>
        <TimerButton stop={stop} start={start} />
      </ButtonWrapper>
      <BottomGradient
        isPause={counterStatus}
        variants={bottomVariants}
        initial="normal"
        animate="animate"
      />
      <BackgroundImg />
    </Container>
  );
}

export default TimerBoard;

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
  background-image: ${(props) =>
      "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),"}
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;
const BottomGradient = styled(motion.div)<{ isPause: boolean }>`
  z-index: 5;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), 80%, Blue);
`;
const ContentsWrapper = styled.div`
  position: relative;
  z-index: 10;
  height: 72%;
  width: 100%;
  color: white;
  @media screen and (max-height: 800px) {
    height: 73.5%;
  }
  @media screen and (max-height: 700px) {
    height: 75%;
  }
`;
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  height: 28%;
  width: 100%;
  z-index: 10;
  @media screen and (max-height: 800px) {
    height: 26.5%;
  }
  @media screen and (max-height: 700px) {
    height: 25%;
  }
`;

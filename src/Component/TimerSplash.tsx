import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Background from "../Assets/image/start_background2.png";
import { timerSplashState } from "../Recoil/atoms";

function TimerSplash() {
  const [isTimerSplash, setIsTimerSplash] = useRecoilState(timerSplashState);
  const [count, setCount] = useState(3);
  const [countToggle, setCountToggle] = useState(true);
  const intervalRef = useRef<any>(null);
  const countRef = useRef<number>(3);
  const countToggleRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      countRef.current -= 1;
      setCount(countRef.current);
      setCountToggle(false);
      if (countRef.current <= 0) {
        clearInterval(intervalRef.current);
        clearInterval(countToggleRef.current);
        setIsTimerSplash(false);
      }
      countToggleRef.current = setInterval(() => {
        setCountToggle(true);
        clearInterval(countToggleRef.current);
      }, 200);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(countToggleRef.current);
    };
  }, []);

  const textVariants = {
    normal: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spling",
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        type: "spling",
        duration: 0.2,
      },
    },
  };
  return (
    <Container>
      <CountBox>
        <AnimatePresence>
          {countToggle && (
            <CountText
              variants={textVariants}
              initial="normal"
              animate="animate"
              exit="exit"
            >
              {count}
            </CountText>
          )}
        </AnimatePresence>
      </CountBox>
      {/* <BackgroundImg /> */}
    </Container>
  );
}

export default TimerSplash;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  background-color: black;
  z-index: 20;
`;
const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
      "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4)),"}
    url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;
const CountBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CountText = styled(motion.div)`
  font-family: "RobotoBold";
  font-size: 10vh;
  color: white;
`;

import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  inputFocusState,
  isBreakState,
  isPauseState,
  timerState,
} from "../../../../Recoil/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as PauseIcon } from "../../../../Assets/Icons/pause.svg";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../../../firebase";

const boxVarients = {
  normal: {
    opacity: 0,
    x: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      type: "linear",
    },
  },
  left: {
    opacity: 1,
    x: -80,
    transition: {
      duration: 0.5,
    },
  },
  right: {
    opacity: 1,
    x: 80,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      type: "linear",
    },
  },
  click: { scale: 0.9 },
};

const barVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      type: "linear",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      type: "linear",
    },
  },
};

interface ITimerButton {
  start: () => void;
  stop: () => void;
  count: number;
}

function TimerButton({ stop, start, count }: ITimerButton) {
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const breakTotal =
    timerObj.setBreakMin * 60 * 100 + timerObj.setBreakSec * 100;
  const focusTotal =
    timerObj.setFocusMin * 60 * 100 + timerObj.setFocusSec * 100;
  const countRef = useRef(1);
  const navigate = useNavigate();
  const params = useParams();
  const todoId = params.todoId;

  //파이어베이스 timer 업데이트
  async function updateTimeSubmit(type: string) {
    const isFocus = type === "focus";
    try {
      if (isFocus) {
        await dbService
          .collection("plan")
          .doc(todoId)
          .collection("timer")
          .doc(timerObj.id)
          .update({
            focusSet: timerObj.focusSet,
            min: timerObj.min,
            sec: timerObj.sec,
          });
      } else {
        await dbService
          .collection("plan")
          .doc(todoId)
          .collection("timer")
          .doc(timerObj.id)
          .update({
            breakSet: timerObj.breakSet,
            breakMin: timerObj.breakMin,
            breakSec: timerObj.breakSec,
          });
      }
    } catch (e) {
      alert("타이머 ERROR.");
    }
  }

  useEffect(() => {
    //애니메이션 기다리고 정지가능
    setTimeout(() => {
      countRef.current = 0;
    }, 700);
    return () => {
      countRef.current = 1;
    };
  }, []);

  const onPauseClick = async () => {
    if (1 <= countRef.current && inputToggle) return;
    if (isBreakSet && 100 < count && breakTotal !== count) {
      countRef.current = 0;
      stop();
      setIsPause(true);
      await updateTimeSubmit("break");
    } else if (!isBreakSet && 100 < count && count !== focusTotal) {
      countRef.current = 0;
      stop();
      setIsPause(true);
      await updateTimeSubmit("focus");
    }
  };

  const onStartClick = () => {
    if (1 <= countRef.current && inputToggle) return;
    countRef.current += 1;
    if (
      isBreakSet &&
      50 < count &&
      breakTotal !== count &&
      countRef.current <= 1
    ) {
      setIsPause(false);
      setTimeout(() => {
        start();
        countRef.current = 0;
      }, 500);
    }
    if (
      !isBreakSet &&
      50 < count &&
      count !== focusTotal &&
      countRef.current <= 1
    ) {
      setIsPause(false);
      setTimeout(() => {
        start();
        countRef.current = 0;
      }, 500);
    }
  };
  const onDoneClick = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      <AnimatePresence>
        {!isPause && (
          <CircleButtonWrapper
            onClick={onPauseClick}
            variants={boxVarients}
            whileTap="click"
            initial="normal"
            animate="animate"
            exit="exit"
            style={{ zIndex: 99 }}
          >
            <BtnBox bg="black">
              <PauseBtn />
            </BtnBox>
          </CircleButtonWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isPause && (
          <>
            <CircleButtonWrapper
              key="stop"
              onClick={onDoneClick}
              variants={boxVarients}
              whileTap="click"
              initial="normal"
              animate="left"
              exit="exit"
            >
              <BtnBox bg="white">
                <StopBtn />
              </BtnBox>
            </CircleButtonWrapper>
            <CircleButtonWrapper
              key="start"
              onClick={onStartClick}
              variants={boxVarients}
              whileTap="click"
              initial="normal"
              animate="right"
              exit="exit"
            >
              <BtnBox bg="black">
                <PlayBtn />
              </BtnBox>
            </CircleButtonWrapper>
            <BarButtonWrapper
              variants={barVariants}
              initial="normal"
              animate="animate"
              exit="exit"
            >
              <BarContainer>
                <BarBox>포기</BarBox>
                <BarLine />
                <BarBox>성공</BarBox>
                <BarLine />
                <BarBox>추가</BarBox>
              </BarContainer>
            </BarButtonWrapper>
          </>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default TimerButton;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
const BarButtonWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding-top: 86px;
  @media screen and (max-height: 800px) {
    padding-top: 76px;
  }
  @media screen and (max-height: 700px) {
    padding-top: 70px;
  }
  @media screen and (max-height: 600px) {
    padding-top: 65px;
  }
`;
const BarContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  margin-top: 40px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1),
    80%,
    rgba(0, 0, 0, 0)
  );
  @media screen and (max-height: 800px) {
    margin-top: 34px;
    height: 44px;
  }
  @media screen and (max-height: 700px) {
    margin-top: 25px;
    height: 40px;
  }
`;
const BarBox = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 100%;
  font-size: 14px;
  color: white;
`;
const BarLine = styled.div`
  display: flex;
  height: 50%;
  width: 1px;
  background-color: gray;
`;
const CircleButtonWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  height: 86px;
  width: 86px;
  @media screen and (max-height: 800px) {
    height: 76px;
    width: 76px;
  }
  @media screen and (max-height: 700px) {
    width: 70px;
    height: 70px;
  }
  @media screen and (max-height: 600px) {
    width: 65px;
    height: 65px;
  }
`;
const BtnBox = styled(motion.div)<{ bg: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  background-color: ${(props) => props.bg};
  cursor: pointer;
`;
const PauseBtn = styled(PauseIcon)`
  color: white;
  width: 30%;
  height: 30%;
`;
const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 42%;
  height: 42%;
`;
const StopBtn = styled(IoStopSharp)`
  color: black;
  width: 42%;
  height: 42%;
`;

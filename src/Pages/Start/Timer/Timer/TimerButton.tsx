import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { isBreakState, isPauseState } from "../../../../Recoil/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as PauseIcon } from "../../../../Assets/Icons/pause.svg";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const boxVarients = {
  normal: {
    opacity: 0,
    x: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
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
  click: { scale: 0.9 },
  exit: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

interface ITimerButton {
  start: () => void;
  stop: () => void;
  breakStop: () => void;
  breakStart: () => void;
}

function TimerButton({ stop, start, breakStop, breakStart }: ITimerButton) {
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const countRef = useRef(1);
  const navigate = useNavigate();

  useEffect(() => {
    //애니메이션 기다리고 정지가능
    setTimeout(() => {
      countRef.current = 0;
    }, 700);
    return () => {
      countRef.current = 1;
    };
  }, []);

  const onPauseClick = () => {
    if (1 <= countRef.current) return;
    countRef.current = 0;
    if (isBreakSet) {
      breakStop();
    } else {
      stop();
    }
    setIsPause(true);
  };
  const onStartClick = () => {
    if (1 <= countRef.current) return;
    countRef.current += 1;
    setIsPause(false);
    if (isBreakSet) {
      setTimeout(() => {
        breakStart();
        countRef.current = 0;
      }, 300);
    } else {
      setTimeout(() => {
        start();
        countRef.current = 0;
      }, 300);
    }
  };
  const onDoneClick = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <AnimatePresence>
        {!isPause && (
          <ButtonWrapper
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
          </ButtonWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isPause && (
          <>
            <ButtonWrapper
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
            </ButtonWrapper>
            <ButtonWrapper
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
            </ButtonWrapper>
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
const ButtonWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  z-index: 50;
  height: 86px;
  width: 86px;
  @media screen and (max-height: 700px) {
    width: 70px;
    height: 70px;
  }
  @media screen and (max-height: 800px) {
    height: 76px;
    width: 76px;
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

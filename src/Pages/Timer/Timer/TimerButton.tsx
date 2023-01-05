import { useRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  addCountState,
  inputFocusState,
  isAddState,
  isBreakState,
  isPauseState,
  loadState,
  timerSplashState,
  timerState,
  toDoState,
} from "../../../Recoil/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as PauseIcon } from "../../../Assets/Icons/pause.svg";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../../firebase";
import { ReactComponent as PlusIcon } from "../../../Assets/Icons/plus.svg";
import { useUsedCount } from "../../../hooks/useUsedCount";

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
  reset: () => void;
  breakReset: () => void;
  breakStop: () => void;
}

function TimerButton({
  stop,
  start,
  count,
  reset,
  breakReset,
  breakStop,
}: ITimerButton) {
  const [isLoad, setIsLoad] = useRecoilState(loadState);
  const [isResultState, setisResultState] = useRecoilState(timerSplashState);
  const [isAdd, setIsAdd] = useRecoilState(isAddState);
  const [timerObj, setTimerObj] = useRecoilState(timerState);
  const [isBreakSet, setIsBreakSet] = useRecoilState(isBreakState);
  const [isPause, setIsPause] = useRecoilState(isPauseState);
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [addSetCount, setAddSetCount] = useRecoilState(addCountState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const breakTotal =
    timerObj.setBreakMin * 60 * 100 + timerObj.setBreakSec * 100;
  const focusTotal =
    timerObj.setFocusMin * 60 * 100 + timerObj.setFocusSec * 100;
  const Moment = require("moment");
  const countRef = useRef(1);
  const navigate = useNavigate();
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);
  const { usedCount } = useUsedCount(isBreakSet, timerObj);

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
            usedCount: usedCount,
            endTime: Moment().format("YYYY-MM-DD hh:mm:ss"),
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
            usedCount: usedCount,
            endTime: Moment().format("YYYY-MM-DD"),
          });
      }
    } catch (e) {
      alert("타이머 ERROR.");
    }
  }

  //파이어베이스 PlanDefaultSet 업데이트
  async function updateDefaultSet() {
    setIsLoad(true);
    try {
      const updateAddSetPlan = () =>
        dbService
          .collection("plan")
          .doc(todoId)
          .update({
            defaultSet: addSetCount + timerObj.setFocusSet,
            addSet: toDos[index].addSet + addSetCount,
          });

      const focusTimeUpdateObj = {
        setFocusSet: addSetCount + timerObj.setFocusSet,
        setBreakSet: addSetCount + timerObj.setBreakSet,
        focusSet: addSetCount + timerObj.focusSet,
        breakSet: addSetCount + timerObj.breakSet,
        breakMin: timerObj.setBreakMin,
        breakSec: timerObj.setBreakSec,
        addSet: addSetCount + timerObj.addSet,
      };

      const breakTimeUpdateObj = {
        setFocusSet: addSetCount + timerObj.setFocusSet,
        setBreakSet: addSetCount + timerObj.setBreakSet,
        focusSet: addSetCount + timerObj.focusSet,
        breakSet: addSetCount + timerObj.breakSet,
        addSet: addSetCount + timerObj.addSet,
      };

      const finishTimeUpdateObj = {
        setFocusSet: addSetCount + timerObj.setFocusSet,
        setBreakSet: addSetCount + timerObj.setBreakSet,
        focusSet: addSetCount,
        breakSet: addSetCount - 1,
        min: timerObj.setFocusMin,
        sec: timerObj.setFocusSec,
        status: "start",
        addSet: addSetCount + timerObj.addSet,
      };

      const isFinished = timerObj.focusSet <= 0;

      const updateAddSetTimer = () =>
        dbService
          .collection("plan")
          .doc(todoId)
          .collection("timer")
          .doc(timerObj.id)
          .update(
            isFinished
              ? finishTimeUpdateObj
              : isBreakSet
              ? breakTimeUpdateObj
              : focusTimeUpdateObj
          )
          .then(() => {
            if (isFinished) {
              reset();
              breakReset();
            } else if (!isBreakSet) {
              breakReset();
            }
          });
      await Promise.all([updateAddSetPlan(), updateAddSetTimer()]);
    } catch (e) {
      alert("추가 ERROR.");
    } finally {
      setIsLoad(false);
    }
  }

  //초기화
  useEffect(() => {
    //시작 애니메이션 기다리고 버튼활성화
    setTimeout(() => {
      countRef.current = 0;
    }, 500);
    return () => {
      countRef.current = 1;
    };
  }, []);

  const onPauseClick = async () => {
    if (1 <= countRef.current && inputToggle) return;
    if (isBreakSet && 0 < count && breakTotal !== count) {
      countRef.current = 0;
      stop();
      setIsPause(true);
      await updateTimeSubmit("break");
    } else if (!isBreakSet && 0 < count && count !== focusTotal) {
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
      0 < count &&
      breakTotal !== count &&
      countRef.current <= 1
    ) {
      setIsPause(false);
      setTimeout(() => {
        start();
        countRef.current = 0;
      }, 300);
    }
    if (
      !isBreakSet &&
      0 < count &&
      count !== focusTotal &&
      countRef.current <= 1
    ) {
      setIsPause(false);
      setTimeout(() => {
        start();
        countRef.current = 0;
      }, 300);
    }
  };
  const onDoneClick = () => {
    navigate(`/`);
  };
  const onFailClick = () => {
    setisResultState(true);
    navigate(`/${todoId}/result/${timerObj.id}/fail`);
  };
  const onSuccessClick = () => {
    setisResultState(true);
    if (0 < timerObj.addSet) {
      navigate(`/${todoId}/result/${timerObj.id}/extend`);
    } else {
      navigate(`/${todoId}/result/${timerObj.id}/success`);
    }
  };
  const onAddClick = () => {
    setIsAdd(true);
  };
  const onAddPlusClick = () => {
    if (10 <= addSetCount + timerObj.setFocusSet) {
      return;
    } else {
      setAddSetCount((prev) => prev + 1);
    }
  };
  const onAddMinusClick = () => {
    if (addSetCount <= 0) {
      return;
    } else {
      setAddSetCount((prev) => prev - 1);
    }
  };
  const onAddSetClick = () => {
    if (0 < addSetCount) {
      updateDefaultSet();
    }
    setIsAdd(false);
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
              onClick={!isAdd ? onDoneClick : onAddMinusClick}
              variants={boxVarients}
              whileTap="click"
              initial="normal"
              animate="left"
              exit="exit"
            >
              <BtnBox bg="white">{!isAdd ? <StopBtn /> : <MinusBtn />}</BtnBox>
            </CircleButtonWrapper>
            <CircleButtonWrapper
              key="start"
              onClick={!isAdd ? onStartClick : onAddPlusClick}
              variants={boxVarients}
              whileTap="click"
              initial="normal"
              animate="right"
              exit="exit"
            >
              <BtnBox bg="black">{!isAdd ? <PlayBtn /> : <PlusBtn />}</BtnBox>
            </CircleButtonWrapper>
            <BarButtonWrapper
              variants={barVariants}
              initial="normal"
              animate="animate"
              exit="exit"
            >
              <BarContainer>
                {!isAdd ? (
                  <>
                    <BarBox onClick={onFailClick}>포기</BarBox>
                    <BarLine />
                    <BarBox onClick={onSuccessClick}>성공</BarBox>
                    <BarLine />
                    <BarBox onClick={onAddClick}>추가</BarBox>
                  </>
                ) : (
                  <>
                    <BarBox onClick={() => setIsAdd(false)}>취소</BarBox>
                    <BarLine />
                    <BarBox onClick={onAddSetClick}>추가</BarBox>
                  </>
                )}
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
  width: 100%;
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
const PlusBtn = styled(PlusIcon)`
  color: white;
  width: 30px;
  height: 30px;
  @media screen and (max-height: 700px) {
    width: 25px;
    height: 25px;
  }
`;
const MinusBtn = styled.div`
  background-color: black;
  width: 32px;
  height: 5px;
  @media screen and (max-height: 700px) {
    width: 25px;
    height: 3.5px;
  }
`;

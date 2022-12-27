import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  selectState,
  cardEditState,
  isTodoEditState,
  selectTodoState,
  isWeekState,
  startDateState,
  endDateState,
  toDoState,
  isStatusLoad,
} from "../../../Recoil/atoms";
import { Dark_Gray, Dark_Gray2 } from "../../../Styles/Colors";
import { useMatch, useNavigate } from "react-router-dom";
import { ReactComponent as EditBtn } from "../../../Assets/Icons/editbtn.svg";
import { ReactComponent as DeletBtn } from "../../../Assets/Icons/deletbtn.svg";
import { authService, dbService } from "../../../firebase";
import useOnClickOutSide from "../../../hooks/useOnClickOutSide";
import { onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { statusColor, statusName } from "../../../Utils/interface";

export const iconVariants = {
  normal: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.8,
      type: "linear",
    },
  },
};

interface ITodoCard {
  todoObj: any;
}

function TodoCard({ todoObj }: ITodoCard) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isWeek, setIsWeek] = useRecoilState(isWeekState);
  const [selectTodo, setSelectTodo] = useRecoilState(selectTodoState);
  const [isClicked, setIsClicked] = useState(false);
  const [isTodoEdit, setIsTodoEdit] = useRecoilState(isTodoEditState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const [isEdit, setIsEdit] = useRecoilState(cardEditState);
  const [counter, setCounter] = useState(0);
  const [btnPopup, setBtnPopup] = useState(false);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [timerArray, setTimeArray] = useState<any[]>([]);
  const [timeStatus, setTimeStatus] = useState("");
  const [statusLoad, setStatusLoad] = useRecoilState(isStatusLoad);
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");
  const planMatch = useMatch("/plan/createTodo");
  const cardWrapperRef = useRef<any>(null);
  const cardRef = useRef<any>();
  const navigate = useNavigate();

  useOnClickOutSide(cardRef, () => {
    setBtnPopup(false);
  });
  const textVariants = {
    normal: {
      height: "42px",
    },
    animate: {
      height: isClicked ? "142px" : "39px",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };

  //isWeek 감지
  useEffect(() => {
    if (!isWeek) {
      setIsClicked(false);
    }
  }, [isWeek]);
  //toDos 변경 감지
  useEffect(() => {
    if (isClicked) {
      setIsClicked(false);
    }
  }, [planMatch]);

  useEffect(() => {
    // 셀렉된 카드 전부 닫기
    if (!isSelect) {
      setIsClicked(false);
    }
  }, [isSelect]);
  const cardVariants = {
    normal: {
      height: "162px",
    },
    animate: {
      height: isClicked ? "262px" : "162px",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
    click: {
      scale: isSelect || btnPopup ? 1 : 0.95,
      transition: {
        delay: 0.3,
      },
    },
  };
  const clickToggle = () => {
    if (!isSelect) {
      setIsSelect(true);
      setIsClicked(true);
    }
    if (isSelect && !isClicked) {
      setIsSelect(false);
      setTimeout(() => {
        setIsSelect(true);
        setIsClicked(true);
      }, 400);
    }
  };
  // 버튼 팝업
  useEffect(() => {
    if (6 < counter) {
      setBtnPopup(true);
      setIsSelect(false);
      setIsClicked(false);
    }
  }, [counter]);

  const intervalRef = React.useRef(null) as any;
  const startCounter = () => {
    setSelectTodo(todoObj.id);
    setStartDate(() => todoObj.startDate);
    setEndDate(() => todoObj.endDate);
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 100);
  };
  useEffect(() => {
    //타이머 Array 할당
    const q = query(
      dbService
        .collection("plan")
        .doc(todoObj.id)
        .collection("timer")
        .where("todoId", "==", todoObj.id)
    );
    const addId = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      if (0 < newArray.length) {
        setTimeArray(newArray);
      }
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        addId();
      }
    });

    //오늘 ToDo상태 체크해서 변경
    dbService
      .collection("plan")
      .doc(todoObj.id)
      .collection("timer")
      .where("date", "==", now)
      .get()
      .then((result) => {
        result.forEach((result) => {
          setTimeStatus(result.data().status);
        });
      });
  }, [todoObj, now]);

  const onCardClick = () => {
    setSelectTodo(todoObj.id);
    setStartDate(() => todoObj.startDate);
    setEndDate(() => todoObj.endDate);
    if (counter < 6 && !isClicked && isWeek) {
      clickToggle();
    } else if (counter < 6 && isClicked && isWeek) {
      setIsSelect(false);
      setIsClicked(false);
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCounter(0);
  };
  const counterStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCounter(0);
  };
  const onMemoClick = () => {
    if (6 >= counter && isWeek) {
      if (isSelect && isClicked) {
        setIsEdit(true);
        setBtnPopup(false);
        navigate(`/plan/memo/${todoObj.id}`);
      }
      clickToggle();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCounter(0);
    }
  };
  const onDubleClick = () => {
    if (!isWeek) {
      setIsWeek(true);
      setIsEdit(true);
      setBtnPopup(false);
      clickToggle();
      navigate(`/plan/memo/${todoObj.id}`);
    }
  };

  let intervalArray = [] as any;
  for (let index = 0; index < todoObj.defaultSet; index++) {
    intervalArray[index] = index;
  }

  async function deleteToDoSubmit() {
    const planDeleteFbase = () => dbService.doc(`plan/${todoObj.id}`).delete();
    const timeDeleteFbase = () => {
      for (let i = 0; i < timerArray.length; i++) {
        dbService
          .doc(`plan/${todoObj.id}`)
          .collection("timer")
          .doc(timerArray[i].id)
          .delete();
      }
    };
    try {
      setStatusLoad(true);
      if (0 < timerArray.length) {
        await Promise.all([planDeleteFbase(), timeDeleteFbase()]);
      } else {
        await planDeleteFbase();
      }
    } catch (e) {
      alert(
        "서버 오류가 발생하여 To-Do삭제가 실패 하였습니다. 다시 To-Do를 삭제해 주세요."
      );
    } finally {
      setStatusLoad(false);
    }
  }
  const onDeleteClick = async () => {
    setBtnPopup(false);
    const ok = window.confirm("To-do를 삭제 하시겠습니까?");
    if (ok) {
      await deleteToDoSubmit();
      setSelectTodo("");
    }
  };
  const onEditClick = async () => {
    setIsTodoEdit(true);
    setBtnPopup(false);
    navigate(`/plan/editTodo/${todoObj.id}`);
  };

  return (
    <Wrapper ref={cardWrapperRef}>
      <TodoCarWrapper
        variants={cardVariants}
        initial="normal"
        animate="animate"
        whileTap="click"
      >
        {btnPopup && (
          <BtnBox ref={cardRef}>
            <DeletBtn onClick={onDeleteClick} />
            <EditBtn onClick={onEditClick} />
          </BtnBox>
        )}
        <TodoTopBox>
          <TextBox>
            <TitleBox>
              <h4>{todoObj.planTitle}</h4>
              {todoObj.status !== "ready" && !statusLoad && (
                <StatusBox style={{ backgroundColor: statusColor[timeStatus] }}>
                  <h5>{statusName[timeStatus]}</h5>
                </StatusBox>
              )}
            </TitleBox>
            <p>{todoObj.planSubTitle}</p>
          </TextBox>
          <IntervalBox>
            <h4>{todoObj.defaultSet}</h4>
            <p>SET</p>
            <StartBtn />
          </IntervalBox>
        </TodoTopBox>
        <MemoContainer
          onMouseDown={startCounter}
          onTouchStart={startCounter}
          onMouseOut={counterStop}
          onTouchEnd={counterStop}
          onClick={onMemoClick}
          onDoubleClick={onDubleClick}
          isselect={isSelect}
        >
          {todoObj.memo !== "" ? (
            <MemoText
              variants={textVariants}
              initial="normal"
              animate="animate"
            >
              {todoObj.memo}
            </MemoText>
          ) : (
            <MemoText>
              <p>
                계획 실천 후 피드백이나 <br />
                실천 중 메모를 적어주세요
              </p>
            </MemoText>
          )}
        </MemoContainer>
        <IntervalBarBox>
          {intervalArray.map((index: number) => (
            <IntervalBar key={index} />
          ))}
        </IntervalBarBox>
        <Background
          onMouseOut={counterStop}
          onTouchEnd={counterStop}
          onClick={onCardClick}
          onDoubleClick={onDubleClick}
          onMouseDown={startCounter}
          onTouchStart={startCounter}
        />
      </TodoCarWrapper>
    </Wrapper>
  );
}

export default React.memo(TodoCard);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 5px;
  padding-top: 23px;
  @media screen and (max-height: 800px) {
    padding-top: 20px;
  }
`;
export const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
export const TodoCarWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
  cursor: pointer;
`;
export const TodoTopBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 25px;
  cursor: pointer;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${Dark_Gray2};
    font-size: 14px;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  h4 {
    letter-spacing: -0.2px;
    font-weight: 700;
    margin-right: 8px;
  }
`;
export const StatusBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  h5 {
    padding: 3px 5px;
    color: white;
    font-size: 10px;
    font-weight: 600;
    @media screen and (max-height: 800px) {
      font-size: 8px;
    }
  }
`;
export const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  p {
    color: ${Dark_Gray2};
  }
`;
export const StartBtn = styled(IoPlaySharp)`
  color: ${Dark_Gray2};
  margin-left: 1.3vh;
`;
export const IntervalBarBox = styled.ul`
  position: absolute;
  display: flex;
  bottom: 0;
  padding-right: 5px;
  width: 80%;
  height: 5px;
`;
export const IntervalBar = styled.li`
  display: flex;
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;
export const MemoContainer = styled.div<{ isselect: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 5;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isselect ? 9 : 2)};
  -webkit-box-orient: vertical;
`;
export const MemoText = styled(motion.div)`
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 1.5;
  font-size: 14px;
  overflow: hidden;
  p {
    color: ${Dark_Gray};
  }
`;
export const MemoForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding-right: 7px;
`;
export const Item = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  svg {
    width: 27px;
    height: 27px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vh;
    font-weight: 400;
    margin-top: 5px;
    color: #cccccc;
  }
`;
const BtnBox = styled.div`
  display: flex;
  top: -15px;
  right: 20px;
  position: absolute;
  z-index: 5;
  svg {
    margin-left: 5px;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

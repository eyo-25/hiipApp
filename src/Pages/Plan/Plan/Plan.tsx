import styled from "styled-components";
import Header from "../../../Component/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";
import CalendarBoard from "../Calendar/CalendarBoard";
import { Light_Gray } from "../../../Styles/Colors";
import TodoBord from "./TodoBoard";
import { useRecoilState } from "recoil";
import {
  isCreateState,
  projectState,
  selectState,
  cardEditState,
  toDoState,
  isTodoEditState,
  isWeekState,
} from "../../../Recoil/atoms";
import TodoMemo from "./TodoMemo";
import { useNavigate } from "react-router-dom";
import CreateTodo from "../CreateTodo/CreateTodo";

function Plan() {
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isWeek, setIsWeek] = useRecoilState(isWeekState);
  const [isEdit, setIsEdit] = useRecoilState(cardEditState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const [isTodoEdit, setIsTodoEdit] = useRecoilState(isTodoEditState);
  const [isCreate, setIsCreate] = useRecoilState(isCreateState);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const [tochedY, setTochedY] = useState(0);

  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeek ? "20%" : "100%",
      transition: {
        duration: 0.9,
        type: "linear",
      },
    },
  };

  // 초기화
  useEffect(() => {
    setIsTodoEdit(false);
    setIsCreate(false);
    if (toDos.length <= 0) {
      setIsWeek(true);
    }
    return () => {
      setIsEdit(false);
      setIsSelect(false);
      setIsWeek(false);
    };
  }, []);

  const closedEdit = () => {
    if (isEdit) {
      setIsEdit(false);
    }
  };

  // 브라우저 스와이프
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };
  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (distanceY < -10) {
      setIsWeek(false);
      closedEdit();
    }
    if (distanceY > 30) {
      setIsWeek(true);
      closedEdit();
    }
  }, [mouseUpClientY]);

  //모바일 스와이프
  const onTouchStart = (e: React.TouchEvent) => {
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;
    if (distanceY < -30) {
      setIsWeek(false);
      closedEdit();
    }
    if (distanceY > 30) {
      setIsWeek(true);
      closedEdit();
    }
  };
  const onPlusClick = () => {
    if (project.length <= 0) {
      navigate("/plan/createProject");
    } else {
      navigate("/plan/createTodo");
      setIsCreate(true);
    }
  };

  return (
    <>
      <Header title={"Plan"} />
      <ContentContainer>
        <CalendarBox
          variants={calendarVariants}
          initial="normal"
          animate="animate"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onClick={closedEdit}
        >
          <CalendarBoard />
        </CalendarBox>
        <TodoContainer>
          <TodoBord />
        </TodoContainer>
      </ContentContainer>
      {!isEdit && (
        <ButtonContainer onClick={onPlusClick}>
          <Button isPlay={false} />
        </ButtonContainer>
      )}
      {isEdit && <TodoMemo />}
      {isCreate && <CreateTodo mode={"CREATE"} />}
      {isTodoEdit && <CreateTodo mode={"EDIT"} />}
    </>
  );
}

export default Plan;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 79.1%;
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const CalendarBox = styled(motion.div)`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: white;
  min-height: 84px;
`;
const TodoContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 2.5vh;
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 99;
`;

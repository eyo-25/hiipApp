import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Header from "../../Component/Header";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../../Component/Button";
import CalendarBoard from "./Calendar/CalendarBoard";
import { Light_Gray } from "../../Styles/Colors";
import TodoBord from "./Plan/TodoBoard";
import { useRecoilState } from "recoil";
import { projectState, selectState, toDoEditState } from "../../Recoil/atoms";
import TodoMemo from "./Plan/TodoMemo";
import CardManage from "./Plan/CardManage";
import { useNavigate } from "react-router-dom";

function Plan() {
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectState);
  const [isWeek, setIsWeek] = useState(false);
  const [isEdit, setIsEdit] = useRecoilState(toDoEditState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const [isCreate, setIsCreate] = useState(false);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const [tochedY, setTochedY] = useState(0);
  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeek ? "17%" : "100%",
      transition: {
        duration: 0.9,
        type: "linear",
      },
    },
  };
  const closedEdit = () => {
    if (isEdit) {
      setIsEdit(false);
    }
  };
  // 언마운트 초기화
  useEffect(() => {
    return setIsEdit(false), setIsSelect(false);
  }, []);
  // 브라우저 스와이프
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };
  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (distanceY < -30) {
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
      navigate("/createProject");
    } else {
      navigate("/plan/createTodo");
      setIsCreate(true);
    }
  };

  return (
    <Applayout>
      <Header />
      <ContentContainer onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <CalendarBox
          variants={calendarVariants}
          initial="normal"
          animate="animate"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onClick={closedEdit}
        >
          <CalendarBoard isWeek={isWeek} setIsWeek={setIsWeek} />
        </CalendarBox>
        <TodoContainer>
          <TodoBord isWeek={isWeek} setIsWeek={setIsWeek} />
        </TodoContainer>
      </ContentContainer>
      {!isEdit && (
        <ButtonContainer onClick={onPlusClick}>
          <Button isPlay={false} />
        </ButtonContainer>
      )}
      {isEdit && <TodoMemo />}
      {isCreate && <CardManage setIsCreate={setIsCreate} />}
    </Applayout>
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
  @media screen and (max-height: 650px) {
    min-height: 84px;
  }
  @media screen and (max-height: 400px) {
    min-height: 70px;
  }
`;
const TodoContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 2.5vh;
  padding-top: 2.8vh;
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 99;
`;

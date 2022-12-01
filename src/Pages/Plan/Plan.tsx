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
import {
  isCreateState,
  projectState,
  selectState,
  cardEditState,
  toDoState,
  isTodoEditState,
} from "../../Recoil/atoms";
import TodoMemo from "./Plan/TodoMemo";
import { useNavigate } from "react-router-dom";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateTodo from "./CreateTodo/CreateTodo";

function Plan() {
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isWeek, setIsWeek] = useState(false);
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
      height: isWeek ? "17%" : "100%",
      transition: {
        duration: 0.9,
        type: "linear",
      },
    },
  };
  //프로젝트 변경 감지
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    const q = query(dbService.collection("project").where("uid", "==", uid));
    const addId = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProject(newArray);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        addId();
      }
    });
  }, []);
  //투두 변경 감지
  useEffect(() => {
    const projectIndex = project.findIndex(
      (item: any) => item.select === "true"
    );
    const q = query(
      dbService
        .collection("plan")
        .where("projectId", "==", project[projectIndex].id)
        .orderBy("index", "desc")
    );
    const addId = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setToDos(newArray);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        addId();
      }
    });
  }, []);

  const closedEdit = () => {
    if (isEdit) {
      setIsEdit(false);
    }
  };
  // 초기화
  useEffect(() => {
    setIsTodoEdit(false);
    setIsCreate(false);
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
      navigate("/plan/createProject");
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
      {isCreate && <CreateTodo mode={"CREATE"} />}
      {isTodoEdit && <CreateTodo mode={"EDIT"} />}
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
  background-color: ${Light_Gray};
  overflow: hidden;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 99;
`;

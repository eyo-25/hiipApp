import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Overlay, Wrapper } from "../Plan/TodoMemo";
import CreateInput from "./CreateInput";
import { useRecoilState } from "recoil";
import {
  createEndDateState,
  createStartDateState,
  createSubTitleState,
  createTitleState,
  isCreateState,
  isTodoEditState,
  projectState,
  toDoState,
} from "../../../Recoil/atoms";
import CalendarBoard from "./CalendarBoard";

const CreateTodo = ({ mode }: { mode: string }) => {
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isCreate, setIsCreate] = useRecoilState(isCreateState);
  const [isTodoEdit, setIsTodoEdit] = useRecoilState(isTodoEditState);
  const [startToggle, setStartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);
  const [startDate, setStartDate] = useRecoilState(createStartDateState);
  const [endDate, setEndDate] = useRecoilState(createEndDateState);
  const [planTitle, setPlanTitle] = useRecoilState(createTitleState);
  const [planSubTitle, setPlanSubTitle] = useRecoilState(createSubTitleState);
  const [count, setCount] = useState(1);
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);

  useEffect(() => {
    //Default 부여
    if (mode === "CREATE") {
      const projectIndex = project.findIndex(
        (item: any) => item.select === "true"
      );
      setCount(project[projectIndex].defaultSet);
    } else {
      setStartDate(`${toDos[index].startDate}`);
      setEndDate(`${toDos[index].endDate}`);
      setPlanTitle(`${toDos[index].planTitle}`);
      setPlanSubTitle(`${toDos[index].planSubTitle}`);
      setCount(toDos[index].defaultSet);
    }
    //클린업
    return () => {
      setStartDate("");
      setEndDate("");
      setPlanTitle("");
      setPlanSubTitle("");
    };
  }, []);

  const backgroundVariants = {
    normal: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
    },
    animate: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(1.5px)",
      transition: {
        duration: 1,
        type: "linear",
      },
    },
  };
  const popupVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 1,
        type: "linear",
      },
    },
  };
  const onOverlayClicked = () => {
    if (mode === "CREATE") {
      setIsCreate(false);
    } else {
      setIsTodoEdit(false);
    }
    navigate("/plan");
  };
  return (
    <Wrapper>
      <ModalWrapper variants={popupVariants} initial="normal" animate="animate">
        {!startToggle && !endToggle && (
          <CreateInput
            setStartToggle={setStartToggle}
            setEndToggle={setEndToggle}
            count={count}
            setCount={setCount}
            mode={mode}
          />
        )}
        {startToggle && (
          <CalendarBoard
            setStartToggle={setStartToggle}
            setEndToggle={setEndToggle}
            isType={"START"}
          />
        )}
        {endToggle && (
          <CalendarBoard
            setStartToggle={setStartToggle}
            setEndToggle={setEndToggle}
            isType={"END"}
          />
        )}
      </ModalWrapper>
      <Overlay
        onClick={onOverlayClicked}
        variants={backgroundVariants}
        initial="normal"
        animate="animate"
      />
    </Wrapper>
  );
};

export default CreateTodo;
const ModalWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 4vh 0;
  height: 45vh;
  width: 100%;
  max-width: 414px;
  background-color: white;
  z-index: 99;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  @media screen and (max-height: 896px) {
    height: 50vh;
  }
  @media screen and (max-height: 770px) {
    height: 400px;
  }
  @media screen and (max-height: 600px) {
    height: 360px;
  }
`;

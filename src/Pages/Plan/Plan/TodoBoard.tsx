import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TodoCard from "./TodoCard";
import {
  cardEditState,
  projectState,
  selectState,
  selectTodoState,
  toDoState,
} from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

const cardVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.8,
      type: "linear",
    },
  },
};

function TodoBord() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isEdit, setIsEdit] = useRecoilState(cardEditState);
  const [project, setProject] = useRecoilState(projectState);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  useEffect(() => {
    return setIsEdit(false);
  }, []);

  const onBackClick = () => {
    setIsSelect(false);
  };

  return (
    <Wrapper isEdit={isEdit}>
      <Container>
        {toDos.length <= 0 && (
          <GuidBox variants={cardVariants} initial="normal" animate="animate">
            {project.length <= 0 ? (
              <GuidText>
                프로젝트를 만들고
                <br />
                플랜을 진행하세요
              </GuidText>
            ) : (
              <GuidText>
                TO-DO를 추가하고
                <br />
                인터벌 플랜을
                <br />
                완성해주세요
              </GuidText>
            )}
          </GuidBox>
        )}
        {toDos?.map((toDo, index) => (
          <CardWrapper
            variants={cardVariants}
            initial="normal"
            animate="animate"
            key={index}
          >
            <TodoCard todoObj={toDo} />
          </CardWrapper>
        ))}
      </Container>
      <Background onClick={onBackClick} />
    </Wrapper>
  );
}
export default TodoBord;

const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const Wrapper = styled.div<{ isEdit: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow-y: ${(props) => (props.isEdit ? "hidden" : "scroll")};
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const CardWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  width: 95%;
  height: 100%;
  margin: 0 0.5vh;
  z-index: 5;
  &:last-child {
    padding-bottom: 23px;
  }
`;
const GuidBox = styled(motion.div)`
  display: flex;
  width: 100%;
  padding-top: 23px;
  padding-left: 15px;
`;
const GuidText = styled.h4`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  color: #e0e0e0;
`;

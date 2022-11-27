import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Applayout from "../../../Component/Applayout";
import {
  endDateState,
  inputFocusState,
  projectTitleState,
  startDateState,
} from "../../../Recoil/atoms";
import { Dark_Gray } from "../../../Styles/Colors";
import CalendarBoard from "./CalendarBoard";

const calendarVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      type: "linear",
    },
  },
};

function CreateProject() {
  const navigate = useNavigate();
  const [inputToggle, setInputToggle] = useRecoilState(inputFocusState);
  const [projectTitle, setProjectTitle] = useRecoilState(projectTitleState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  const reset = () => {
    setProjectTitle("");
    setInputToggle(false);
    setStartDate("");
    setEndDate("");
  };
  const projectChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setProjectTitle(value);
  };
  const onNextClick = () => {
    if (projectTitle === "") {
      alert("프로젝트 제목을 설정해주세요");
      return;
    }
    if (startDate === "" || endDate === "") {
      alert("D-DAY를 설정해주세요");
      return;
    }
    navigate("/plan/intervalSetting");
  };
  useEffect(() => {
    reset();
  }, []);
  return (
    <Applayout>
      <ContentContainer>
        <Wrapper>
          <TitleBox>
            <h4>프로젝트 제목은 무엇인가요?</h4>
            <TitleInput
              value={projectTitle}
              onChange={projectChange}
              required
              onFocus={() => setInputToggle(true)}
              onBlur={() => setInputToggle(false)}
            />
          </TitleBox>
          {!inputToggle && (
            <BottomBox
              variants={calendarVariants}
              initial="normal"
              animate="animate"
            >
              <CalendarBox>
                <h4>D-DAY가 언제이신가요?</h4>
                <CalendarBoard />
              </CalendarBox>
              <ButtonBox>
                <NextButton onClick={onNextClick}>다음</NextButton>
              </ButtonBox>
            </BottomBox>
          )}
        </Wrapper>
      </ContentContainer>
    </Applayout>
  );
}

export default CreateProject;
const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: calc(var(--vh, 1vh) * 14);
  overflow: hidden;
  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 85%;
  margin: 0 auto;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding-top: 45px;
  border-bottom: 1px solid ${Dark_Gray};
  h4 {
    font-size: 20px;
    margin-bottom: 2.6vh;
    @media screen and (max-height: 667px) {
      margin-bottom: 20px;
    }
  }
`;
const TitleInput = styled.input`
  border: none;
  height: 40px;
  margin-bottom: 5px;
`;
const BottomBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const CalendarBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
  h4 {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 10%;
  min-height: 60px;
`;
const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: 500;
  cursor: pointer;
`;

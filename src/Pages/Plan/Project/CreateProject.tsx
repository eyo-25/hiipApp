import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  endDateState,
  inputFocusState,
  projectTitleState,
  startDateState,
} from "../../../Recoil/atoms";
import { Dark_Gray } from "../../../Styles/Colors";
import CalendarBoard from "./CalendarBoard";
import { isAndroid } from "react-device-detect";

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
  const inputRef = useRef<any>(null);
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
    navigate("/plan/intervalSetting/create");
  };
  const onKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      inputRef.current.blur();
    }
  };
  useEffect(() => {
    reset();
    return () => {
      setInputToggle(false);
      inputRef.current = null;
    };
  }, []);
  return (
    <ContentContainer>
      <Wrapper>
        <TitleBox>
          <MainTitle>프로젝트 제목은 무엇인가요?</MainTitle>
          <TitleInput
            ref={inputRef}
            value={projectTitle}
            onChange={projectChange}
            required
            onFocus={() => setInputToggle(true)}
            onBlur={() => setInputToggle(false)}
            onKeyPress={onKeyPress}
          />
        </TitleBox>
        <BottomBox
          variants={calendarVariants}
          initial="normal"
          animate="animate"
        >
          <CalendarBox>
            <MainTitle>D-DAY가 언제이신가요?</MainTitle>
            <CalendarBoard />
          </CalendarBox>
          <ButtonWrapper>
            {!(inputToggle && isAndroid) && (
              <NextButton
                onClick={onNextClick}
                variants={calendarVariants}
                initial="normal"
                animate="animate"
              >
                <ButtonBox>
                  <ButtonText>다음</ButtonText>
                </ButtonBox>
              </NextButton>
            )}
          </ButtonWrapper>
        </BottomBox>
      </Wrapper>
    </ContentContainer>
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
  border-bottom: 1.5px solid ${Dark_Gray};
`;
const MainTitle = styled.h4`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 15px;
  @media screen and (min-height: 640px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  @media screen and (min-height: 740px) {
    margin-top: 50px;
    margin-bottom: 23px;
  }
  @media screen and (min-height: 800px) {
    margin-top: 60px;
    margin-bottom: 24px;
  }
  @media screen and (min-height: 900px) {
    margin-top: 9.5vh;
  }
`;
const TitleInput = styled.input`
  border: none;
  height: 30px;
  margin-bottom: 5px;
`;
const BottomBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 45px;
  border-radius: 5px;
  background-color: black;
`;
const ButtonText = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 1px;
  cursor: pointer;
  color: white;
`;
const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const NextButton = styled(motion.div)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  font-weight: 500;
  margin-bottom: 10px;
`;

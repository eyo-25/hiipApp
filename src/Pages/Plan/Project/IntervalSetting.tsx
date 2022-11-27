import styled from "styled-components";
import Applayout from "../../../Component/Applayout";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { ReactComponent as PlusIcon } from "../../../Assets/Icons/plusbtn.svg";
import { ReactComponent as MinusIcon } from "../../../Assets/Icons/minusbtn.svg";
import { Blue, Dark_Gray2, Red } from "../../../Styles/Colors";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  endDateState,
  projectState,
  projectTitleState,
  startDateState,
} from "../../../Recoil/atoms";
import { dbService } from "../../../firebase";

function IntervalSetting() {
  const navigate = useNavigate();
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [defaultSet, setDefaultSet] = useState(4);
  const [projectTitle, setProjectTitle] = useRecoilState(projectTitleState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);

  const reset = () => {
    setFocusMin(25);
    setBreakMin(5);
    setDefaultSet(4);
    setProjectTitle("");
    setStartDate("");
    setEndDate("");
  };
  const onMinusClick = (type: string) => {
    const minusSwitch = (prev: number, type: string) => {
      switch (prev) {
        case 1:
          return 1;
        case 5:
          return type === "Focus" ? prev : prev - 1;
        default:
          return type === "Focus" ? prev - 5 : prev - 1;
      }
    };
    switch (type) {
      case "Focus":
        setFocusMin((prev) => minusSwitch(prev, type));
        break;
      case "Break":
        setBreakMin((prev) => minusSwitch(prev, type));
        break;
      case "DefaultSet":
        setDefaultSet((prev) => minusSwitch(prev, type));
        break;
    }
  };
  const onPlusClick = (type: string) => {
    const plusSwitch = (prev: number, type: string) => {
      switch (prev) {
        case 10:
          return type === "DefaultSet" ? prev : "Focus" ? prev + 5 : prev + 1;
        case 30:
          return type === "Break" ? prev : prev + 5;
        case 60:
          return prev;
        default:
          return type === "Focus" ? prev + 5 : prev + 1;
      }
    };
    switch (type) {
      case "Focus":
        setFocusMin((prev) => plusSwitch(prev, type));
        break;
      case "Break":
        setBreakMin((prev) => plusSwitch(prev, type));
        break;
      case "DefaultSet":
        setDefaultSet((prev) => plusSwitch(prev, type));
        break;
    }
  };
  const onSubmit = async () => {
    const ok = window.confirm("프로젝트를 생성하시겠습니까?");
    if (ok) {
      const uid = JSON.parse(localStorage.getItem("user") as any).uid;
      const projectObj = {
        defaultSet: defaultSet,
        endDate: endDate,
        focusMin: focusMin,
        projectTitle: projectTitle,
        breakMin: breakMin,
        startDate: startDate,
        uid: uid,
      };
      await dbService
        .collection("project")
        .add(projectObj)
        .then(() => {
          reset();
        });
      navigate("/plan");
    }
  };
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  return (
    <Applayout>
      <ContentContainer>
        <AsideWrapper>
          <Header>
            <h4>인터벌 설정</h4>
            <InfoIcon />
          </Header>
          <InfoBox>
            <ItemTitleBox>POMODORO</ItemTitleBox>
            <InfoText>
              뽀모도로(Pomodoro)란 프란체스코 시릴로가 제안한 시간관리법으로
              업무 및 학습을 진행함에 있어서 집중과 휴식 시간 설정을 통해
              시간관리를 효율적으로 할 수 있고 집중과 휴식을 인터벌 세트를
              구성하여 높은 집중력과 목표성취를 체계적으로 달성할 수 있도록
              합니다
            </InfoText>
            {/* <InfoText>
              뽀모도로 기본세트는 25분 집중 / 5분 휴식이며 개개인의 집중력에
              따라 집중과 휴식 세트 횟수를 설정할 수 있으며 이후 진행 후
              피드백을 통해 자신에게 맞는 집중/휴식 시간을 찾을 수 있습니다.
            </InfoText> */}
          </InfoBox>
          <SettingBox>
            <ItemTitleBox>
              <h4>FOCUS</h4>
              <TimeBar isWidth={8} />
            </ItemTitleBox>
            <ItemContentBox>
              <MinusBtn onClick={() => onMinusClick("Focus")} />
              <CountBox>{focusMin}m</CountBox>
              <PlusBtn onClick={() => onPlusClick("Focus")} />
            </ItemContentBox>
          </SettingBox>
          <SettingBox>
            <ItemTitleBox>
              <h4>SHORT BREAK</h4>
              <BreakBar isWidth={8} />
            </ItemTitleBox>
            <ItemContentBox>
              <MinusBtn onClick={() => onMinusClick("Break")} />
              <CountBox>{breakMin}m</CountBox>
              <PlusBtn onClick={() => onPlusClick("Break")} />
            </ItemContentBox>
          </SettingBox>
          <SettingBox>
            <ItemTitleBox>
              <h4>DEFAULT SET</h4>
              <TimeBar isWidth={focusMin} />
              <BreakBar isWidth={breakMin} style={{ marginLeft: 0 }} />
            </ItemTitleBox>
            <ItemContentBox>
              <MinusBtn onClick={() => onMinusClick("DefaultSet")} />
              <CountBox>{defaultSet}set</CountBox>
              <PlusBtn onClick={() => onPlusClick("DefaultSet")} />
            </ItemContentBox>
          </SettingBox>
          <ButtonBox>
            <ButtonText onClick={onSubmit}>완료</ButtonText>
          </ButtonBox>
        </AsideWrapper>
      </ContentContainer>
    </Applayout>
  );
}

export default IntervalSetting;

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
const AsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 85%;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 12%;
  h4 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -1px;
    margin-right: 10px;
  }
`;
const InfoIcon = styled(AiOutlineInfoCircle)`
  width: 16px;
  height: 16px;
`;
const InfoBox = styled.div`
  height: 28%;
  margin: 0 10px;
`;
const SettingBox = styled.div`
  height: 18%;
  margin: 0 10px;
`;
const ButtonBox = styled.div`
  height: 12%;
  display: flex;

  align-items: flex-start;
  justify-content: center;
`;
const ButtonText = styled.h4`
  margin-top: 5%;
  font-size: 23px;
  font-weight: 500;
  cursor: pointer;
`;
const ItemTitleBox = styled.div`
  display: flex;
  align-items: center;
  height: 15%;
  font-weight: 600;
`;
const TimeBar = styled.div<{ isWidth: number }>`
  margin-left: 15px;
  height: 8px;
  width: ${(props) => props.isWidth}px;
  background-color: ${Blue};
`;
const BreakBar = styled(TimeBar)<{ isWidth: number }>`
  background-color: ${Red};
`;
const ItemContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85%;
`;
const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 181px;
  font-family: "Roboto";
  font-size: 20px;
`;
const MinusBtn = styled(MinusIcon)`
  cursor: pointer;
`;
const PlusBtn = styled(PlusIcon)`
  cursor: pointer;
`;
const InfoText = styled.div`
  display: flex;
  align-items: center;
  height: 80%;
  font-size: 14px;
  letter-spacing: -0.8px;
  line-height: 1.3;
  color: ${Dark_Gray2};
  overflow: hidden;
`;

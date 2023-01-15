import styled from "styled-components";
import { Blue, Dark_Gray3, Red } from "../../../Styles/Colors";
import { IoHelpCircleOutline } from "react-icons/io5";

function MyFocusLimit() {
  return (
    <Wrapper>
      <TitleContainer>
        <h3>내 집중력의 한계는</h3>
      </TitleContainer>
      <ContentContaner>
        <ContentSetBox>
          <SetBox>
            <h2>6</h2>
            <h3>SET</h3>
          </SetBox>
          <h5>
            인터벌 세트 수를
            <br />
            <span>최대 6세트</span>로 설정하세요.
          </h5>
        </ContentSetBox>
        <EverageFocusBox>
          <TimeTextBox>
            <p>평균 집중 시간</p>
            <QuestionIcon />
          </TimeTextBox>
          <h6>1h 30m</h6>
          <PercentBar>
            <PercentGauge></PercentGauge>
          </PercentBar>
        </EverageFocusBox>
        <MaximumFocusBox>
          <TimeTextBox>
            <p>최대 집중 시간</p>
            <QuestionIcon />
          </TimeTextBox>
          <h6>1h 30m</h6>
          <PercentBar>
            <PercentGauge></PercentGauge>
          </PercentBar>
        </MaximumFocusBox>
      </ContentContaner>
    </Wrapper>
  );
}

export default MyFocusLimit;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 90%;
`;
const TitleContainer = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
`;
const ContentContaner = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  border-radius: 1vh;
  background-color: white;
  padding: 3vh;
`;
const ContentSetBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40%;
  width: 100%;
  h5 {
    color: #333333;
    font-size: 2vh;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -1px;
    margin-bottom: 4%;
    span {
      font-size: 2vh;
      color: ${Red};
    }
  }
`;
const SetBox = styled.div`
  display: flex;
  align-items: flex-end;
  h3 {
    font-size: 4.5vh;
    font-family: "Roboto";
    font-weight: 800;
  }
`;
const EverageFocusBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 100%;
  padding-top: 3%;
  p {
    color: ${Dark_Gray3};
    font-size: 1.7vh;
    font-weight: 600;
  }
  h6 {
    margin-bottom: 1.5vh;
  }
`;
const MaximumFocusBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 30%;
  width: 100%;
  p {
    color: ${Dark_Gray3};
    font-size: 1.7vh;
    font-weight: 600;
  }
  h6 {
    margin-bottom: 1.5vh;
  }
`;
const TimeTextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5vh;
`;
const PercentBar = styled.div`
  position: relative;
  display: flex;
  height: 1.3vh;
  width: 100%;
  background-color: #f2f2f2;
`;
const PercentGauge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background-color: ${Blue};
`;
const QuestionIcon = styled(IoHelpCircleOutline)`
  width: 2.3vh;
  height: 2.3vh;
  margin-left: 0.5vh;
  color: ${Dark_Gray3};
`;

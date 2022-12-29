import styled from "styled-components";
import { Dark_Gray3, Normal_Gray2 } from "../../Styles/Colors";
import Background from "../../Assets/image/result_success.png";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ResultGraph from "./ResultGraph";
import { useState } from "react";

function TimerResult() {
  const [a, b] = useState(false);
  const calendarDays = ["일", "월", "화", "수", "목", "금", "토"];
  const navigate = useNavigate();
  return (
    <Container>
      <TopWrapper>
        <TopContainer>
          <PrevIcon onClick={() => navigate(`/`)} />
          <ResultText>
            성공을 맛 봤으니
            <br />
            꾸준함을 맛볼 차례다.
          </ResultText>
        </TopContainer>
        <BackgroundImg />
      </TopWrapper>
      <BottomWrapper>
        <ResultInfoContainer>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>30%</h4>
            <p>계획진행</p>
          </ResultInfoBox>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>8SET</h4>
            <p>진행세트</p>
          </ResultInfoBox>
          <ResultInfoBox>
            <NewBox>+18</NewBox>
            <h4>2SET</h4>
            <p>추가세트</p>
          </ResultInfoBox>
        </ResultInfoContainer>
        <ResultGraphWrapper>
          <ResultGraphContainer>
            <GraphTextBox onClick={() => b((prev) => !prev)}>
              <h4>COACH TIP</h4>
              <p>
                어제보다 평균 집중시간이
                <br />
                <span>12% 하락</span>하였습니다.
              </p>
            </GraphTextBox>
            <GraphBox>
              {/* <LineBox></LineBox>
              <BarContainer>
                {calendarDays.map((days) => (
                  <BarBox key={days}>
                    <Bar></Bar>
                  </BarBox>
                ))}
              </BarContainer>
              <DayContainer>
                {calendarDays.map((days) => (
                  <DayBox key={days}>{days}</DayBox>
                ))}
              </DayContainer> */}
              {a && <ResultGraph />}
            </GraphBox>
          </ResultGraphContainer>
        </ResultGraphWrapper>
        <PushBarWrapper>
          <PushBarContainer></PushBarContainer>
        </PushBarWrapper>
      </BottomWrapper>
    </Container>
  );
}

export default TimerResult;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 414px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  z-index: 20;
`;
const TopWrapper = styled.div`
  position: relative;
  height: 30%;
  background-color: black;
`;
const TopContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 24px;
  z-index: 10;
`;
const BackgroundImg = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.5;
`;
const PrevIcon = styled(IoChevronBackSharp)`
  height: 24px;
  width: 24px;
  color: white;
  margin-top: 2.5vh;
  cursor: pointer;
`;
const ResultText = styled.div`
  color: white;
  font-size: 3.2vh;
  letter-spacing: -0.5px;
  line-height: 1.5;
  font-weight: 900;
  margin-bottom: 7vh;
`;
const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 75%;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  background-color: ${Normal_Gray2};
  width: 100%;
  padding: 6vh 24px 7vh 24px;
`;
const ResultInfoContainer = styled.div`
  height: 25%;
  width: 100%;
  display: flex;
  padding-bottom: 3vh;
`;
const ResultInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 100%;
  margin-right: 5%;
  border-radius: 7px;
  background-color: white;
  padding: 2vh;
  &:last-child {
    margin-right: 0;
  }
  h4 {
    margin-top: 1.2vh;
    font-weight: 900;
    font-size: 2.8vh;
  }
  p {
    margin-top: 1.4vh;
    color: ${Dark_Gray3};
    font-weight: 500;
    font-size: 1.5vh;
  }
`;
const NewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  width: 30px;
  height: 18px;
  border-radius: 10px;
  color: white;
  font-size: 1vh;
`;
const ResultGraphWrapper = styled.div`
  height: 65%;
  width: 100%;
  border-radius: 7px;
  padding-bottom: 3vh;
`;
const ResultGraphContainer = styled.div`
  border-radius: 7px;
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 2.3vh;
`;
const GraphTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 22%;
  h4 {
    font-weight: 600;
    margin-bottom: 1.2vh;
    font-size: 2vh;
  }
  p {
    font-weight: 500;
    letter-spacing: -0.8px;
    line-height: 1.3;
    text-align: center;
    font-size: 1.6vh;
    span {
      color: Blue;
    }
  }
`;
const GraphBox = styled.div`
  position: relative;
  height: 78%;
`;
const LineBox = styled.div`
  height: 90%;
  background-color: gray;
`;
const BarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: aqua;
  width: 80%;
  height: 90%;
  display: flex;
`;
const BarBox = styled.div`
  height: 100%;
  width: 100%;
`;
const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 10%;
  width: 80%;
  margin: 0 auto;
`;
const DayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.7vh;
  font-size: 1.6vh;
`;
const PushBarWrapper = styled.div`
  height: 10%;
  width: 100%;
`;
const PushBarContainer = styled.div`
  border-radius: 7px;
  height: 100%;
  width: 100%;
  background-color: white;
`;

import styled from "styled-components";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import MadBackground from "../../../Assets/image/coachResult_Mad.png";
import { feedBackTodoState, projectState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Dark_Gray, Dark_Gray2 } from "../../../Styles/Colors";

function CoachBoard() {
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  const [isOption, setIsOption] = useState(false);

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <TitleBox
            onClick={() => {
              setIsOption((prev) => !prev);
            }}
          >
            <p>{feedBackTodo[0].planTitle}</p>
            {isOption ? <OptionIconUp /> : <OptionIconDown />}
          </TitleBox>
          {isOption ? (
            <PlanContainer>
              {feedBackTodo.map((todo, index) => (
                <PlanBox key={index}>
                  <p>{todo.planTitle}</p>
                </PlanBox>
              ))}
            </PlanContainer>
          ) : (
            <h4>
              플랜에 대한 <br />
              코치 평가
            </h4>
          )}
        </TextContainer>
        <ImageBox>
          <BackgroundImg background={MadBackground} />
        </ImageBox>
        <BottomBox>
          <BottomTextBox>
            <h4>PLAN SCORE : 23</h4>
            <p>
              유튜브 덜봤다면
              <br />
              3세트는 더했다 애송아
            </p>
          </BottomTextBox>
          <SlideIcon />
        </BottomBox>
      </ContentWrapper>
    </Container>
  );
}

export default CoachBoard;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 86);
  width: 100%;
  padding: calc(var(--vh, 1vh) * 4) 0;
  background-color: black;
  color: white;
`;
const ContentWrapper = styled.div`
  width: 85%;
`;
const TextContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 23%;
  width: 100%;
  h4 {
    font-size: 4vh;
    font-weight: 900;
    line-height: 1.3;
  }
`;
const TitleBox = styled.div`
  width: 20vh;
  height: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3vh;
  cursor: pointer;
  p {
    font-size: 2.3vh;
  }
`;
const OptionIconDown = styled(IoChevronDownSharp)`
  height: 2.3vh;
  width: 2.3vh;
  color: #8e8e8e;
`;
const OptionIconUp = styled(IoChevronUpSharp)`
  height: 2.3vh;
  width: 2.3vh;
  color: #8e8e8e;
`;
const PlanContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: 4vh;
  padding-top: 0.5vh;
  display: flex;
  flex-direction: column;
  width: 20vh;
  z-index: 999;
`;
const PlanBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4vh;
  padding: 0 0.3vh;
  cursor: pointer;
  &:first-child {
    display: none;
  }
  p {
    font-size: 2vh;
    color: ${Dark_Gray};
  }
`;
const ImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52%;
  width: 100%;
`;
const BackgroundImg = styled.div<{ background: any }>`
  position: absolute;
  width: 90vw;
  max-width: 400px;
  height: 80%;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.8;
`;
const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 25%;
  width: 100%;
`;
const BottomTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  h4 {
    font-weight: 600;
    margin-bottom: 13%;
    font-size: 2.5vh;
  }
  p {
    line-height: 1.4;
    font-size: 1.8vh;
  }
`;
const SlideIcon = styled(IoChevronDownSharp)`
  height: 3vh;
  width: 3vh;
`;

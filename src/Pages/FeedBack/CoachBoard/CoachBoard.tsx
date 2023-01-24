import styled from "styled-components";
import { IoChevronDownSharp } from "react-icons/io5";
import MadBackground from "../../../Assets/image/coachResult_Mad.png";
import { feedBackTodoState, projectState } from "../../../Recoil/atoms";
import { useRecoilState } from "recoil";

function CoachBoard() {
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  return (
    <Container>
      <ContentWrapper>
        <TextBox>
          <p>{feedBackTodo[0].planTitle}</p>
          <h4>
            플랜에 대한 <br />
            코치 평가
          </h4>
        </TextBox>
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
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 23%;
  width: 100%;
  p {
    margin-top: 5px;
    font-size: 2vh;
  }
  h4 {
    font-size: 4vh;
    font-weight: 900;
    line-height: 1.3;
  }
`;
const ImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54%;
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
  height: 23%;
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

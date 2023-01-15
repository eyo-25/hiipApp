import styled from "styled-components";
import { Normal_Gray2 } from "../../../Styles/Colors";

function MyRecentTitle() {
  return (
    <Wrapper>
      <TitleContainer>
        <h3>나의 최근 타이틀</h3>
      </TitleContainer>
      <ContentContaner>
        <BadgeBox>
          <BadgeIcon />
          <BadgeTextBox>
            <p>집중레벨 2</p>
            <h5>나는 오늘도 집중벌레</h5>
          </BadgeTextBox>
        </BadgeBox>
        <BadgeBox>
          <BadgeIcon />
          <BadgeTextBox>
            <p>집중레벨 1</p>
            <h5>나와의 약속을 어기는 사람</h5>
          </BadgeTextBox>
        </BadgeBox>
      </ContentContaner>
    </Wrapper>
  );
}

export default MyRecentTitle;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 90%;
`;
const TitleContainer = styled.div`
  display: flex;
  margin-top: 8%;
  height: 17%;
  width: 100%;
`;
const ContentContaner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 10%;
  height: 65%;
  width: 100%;
  border-radius: 1vh;
  background-color: white;
  padding: 3vh;
`;
const BadgeBox = styled.div`
  display: flex;
  height: 37%;
  width: 100%;
`;
const BadgeIcon = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.8vh;
  background-color: ${Normal_Gray2};
`;
const BadgeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2vh;
  p {
    color: #828282;
    font-size: 1.4vh;
    margin-bottom: 1vh;
    font-weight: 600;
  }
  h5 {
    font-size: 1.8vh;
    letter-spacing: -1px;
    font-weight: 400;
  }
`;

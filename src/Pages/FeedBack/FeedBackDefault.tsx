import styled from "styled-components";
import Header from "../../Component/Header";

function FeedBackDefault() {
  return (
    <Container>
      <Header title={"FeedBack"} />
      <Wrapper>
        <GuidText>
          TO-DO를 추가하고
          <br />
          인터벌을 완성해
          <br />
          피드백을 받으세요
        </GuidText>
      </Wrapper>
    </Container>
  );
}

export default FeedBackDefault;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  width: 85%;
  height: 100%;
  padding: 3vh 0;
`;
const GuidText = styled.h4`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  color: #e0e0e0;
`;

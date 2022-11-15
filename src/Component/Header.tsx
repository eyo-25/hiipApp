import { useMatch } from "react-router-dom";
import styled from "styled-components";

function Header() {
  const planMatch = useMatch("/plan/*");
  const mypageMatch = useMatch("/mypage/*");
  return (
    <Container>
      {planMatch && (
        <HeaderBox>
          <Dday>D 14</Dday>
          <ProjectTitle>중간고사</ProjectTitle>
          <HamMenu>
            <HamLine />
            <HamLine />
          </HamMenu>
        </HeaderBox>
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 7vh;
`;
const HeaderBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 2vh;
`;
const Dday = styled.h4`
  position: absolute;
  left: 0;
  letter-spacing: -1.3px;
  font-weight: 600;
  font-size: 2.6vh;
  @media screen and (min-height: 800px) {
    font-size: 2.3vh;
  }
`;
const ProjectTitle = styled.h4`
  font-weight: 900;
  letter-spacing: -1.3px;
  font-size: 2.9vh;
  @media screen and (min-height: 800px) {
    font-size: 2.5vh;
  }
`;
const HamMenu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.3vh;
  height: 1.8vh;
  @media screen and (min-height: 800px) {
    width: 2vh;
    height: 1.6vh;
  }
`;
const HamLine = styled.div`
  width: 100%;
  height: 0.3vh;
  border-radius: 0.5vh;
  background-color: black;
`;

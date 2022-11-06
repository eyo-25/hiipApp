import styled from "styled-components";

function Header() {
  return (
    <Container>
      <HeaderBox>헤더입니다</HeaderBox>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 7vh;
  background-color: #1abc9c;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 375px;
  width: 85%;
  margin: 0 auto;
`;

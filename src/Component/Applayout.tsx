import styled from "styled-components";
import NavBar from "./NavBar";

function Applayout({ children }: { children: any }) {
  return (
    <Container>
      <ContentContainer>{children}</ContentContainer>
      <NavBar />
    </Container>
  );
}

export default Applayout;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 90vh;
  overflow: hidden;
`;

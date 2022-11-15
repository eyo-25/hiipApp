import styled from "styled-components";
import NavBar from "./NavBar";

function Applayout({ children }: { children: any }) {
  return (
    <Container>
      {children}
      <NavBar />
    </Container>
  );
}

export default Applayout;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: white;
`;

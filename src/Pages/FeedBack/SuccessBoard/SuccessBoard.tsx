import styled from "styled-components";
import SuccessPercent from "./SuccessPercent";
import SuccessPossibility from "./SuccessPossibility";

function SuccessBoard() {
  return (
    <Container>
      <SuccessPossibility />
      <SuccessPercent />
    </Container>
  );
}

export default SuccessBoard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 86);
  width: 100%;
`;

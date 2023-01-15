import styled from "styled-components";
import MyFocusLimit from "./MyFocusLimit";
import MyRecentTitle from "./MyRecentTitle";

function MyBoard() {
  return (
    <Container>
      <MyRecentTitle />
      <MyFocusLimit />
    </Container>
  );
}

export default MyBoard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(var(--vh, 1vh) * 86);
  width: 100%;
`;

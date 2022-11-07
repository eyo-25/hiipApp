import { IoPlaySharp } from "react-icons/io5";
import styled from "styled-components";

function TodoCard() {
  return (
    <DragBox>
      <TextBox>
        <TitleBox>
          <h4>대창 볶음밥</h4>
          <StatusBox>
            <h5>진행중</h5>
          </StatusBox>
        </TitleBox>
        <p>아보카도 샌드위치</p>
      </TextBox>
      <IntervalBox>
        <h4>0</h4>
        <span>SET</span>
        <StartBtn />
      </IntervalBox>
      <IntervalBarBox></IntervalBarBox>
    </DragBox>
  );
}

export default TodoCard;

const DragBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 35px;
  height: 90px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  background: #f2f2f2;
  box-shadow: 0.5px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media screen and (max-height: 800px) {
    height: 80px;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #9d9d9d;
    font-size: 14px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  h4 {
    letter-spacing: -0.2px;
    font-weight: 700;
    margin-right: 8px;
  }
`;

const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1012ff;
  border-radius: 10px;
  h5 {
    padding: 3px 5px;
    color: white;
    font-size: 10px;
    font-weight: 600;
  }
`;

const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  span {
    color: #9d9d9d;
  }
`;

const StartBtn = styled(IoPlaySharp)`
  color: #9d9d9d;
  margin-left: 15px;
`;

const IntervalBarBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 310px;
  height: 4px;
`;

const IntervalBar = styled.div<{ isReadyCard: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isReadyCard ? "black" : "#cccccc")};
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;

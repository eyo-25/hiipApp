import { IoPlaySharp } from "react-icons/io5";
import styled from "styled-components";
import {
  Blue,
  Dark_Gray2,
  Normal_Gray2,
  Normal_Gray3,
} from "../../../Styles/Colors";

function TodoCard() {
  const intervalArray = [3, 2, 1];
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
        <p>SET</p>
        <StartBtn />
      </IntervalBox>
      <IntervalBarBox>
        {intervalArray.map((index) => (
          <IntervalBar key={index} />
        ))}
      </IntervalBarBox>
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
  background-color: ${Normal_Gray2};
  cursor: pointer;
  @media screen and (max-height: 800px) {
    height: 80px;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${Dark_Gray2};
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
const StatusBox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Blue};
  border-radius: 10px;
  h5 {
    padding: 3px 5px;
    color: white;
    font-size: 10px;
    font-weight: 600;
    @media screen and (max-height: 800px) {
      font-size: 8px;
    }
  }
`;
const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  p {
    color: ${Dark_Gray2};
  }
`;
const StartBtn = styled(IoPlaySharp)`
  color: ${Dark_Gray2};
  margin-left: 1.3vh;
`;
const IntervalBarBox = styled.ul`
  position: absolute;
  display: flex;
  bottom: 0;
  padding-right: 5px;
  width: 80%;
  height: 4px;
`;
const IntervalBar = styled.li`
  display: flex;
  background-color: ${Normal_Gray3};
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;

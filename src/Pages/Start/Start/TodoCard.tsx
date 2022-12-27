import { IoPlaySharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Blue,
  Dark_Gray2,
  Normal_Gray2,
  Normal_Gray3,
} from "../../../Styles/Colors";
import { dbService } from "../../../firebase";
import { statusColor, statusName } from "../../../Utils/interface";

function TodoCard({ todoObj }: any) {
  const [intervalArray, setIntervalArray] = useState<number[]>([]);
  const [timeStatus, setTimeStatus] = useState("");
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");

  useEffect(() => {
    setIntervalArray((prev) => {
      const copy = [...prev];
      for (let index = 0; index < todoObj.defaultSet; index++) {
        copy[index] = index;
      }
      return [...copy];
    });
  }, []);

  useEffect(() => {
    dbService
      .collection("plan")
      .doc(todoObj.id)
      .collection("timer")
      .where("date", "==", now)
      .get()
      .then((result) => {
        result.forEach((result) => {
          setTimeStatus(result.data().status);
        });
      });
  }, []);

  return (
    <DragBox>
      <TextBox>
        <TitleBox>
          <h4>{todoObj.planTitle}</h4>
          <StatusBox>
            {todoObj.status !== "ready" && (
              <StatusBox style={{ backgroundColor: statusColor[timeStatus] }}>
                <h5>{statusName[timeStatus]}</h5>
              </StatusBox>
            )}
          </StatusBox>
        </TitleBox>
        <p>{todoObj.planSubTitle}</p>
      </TextBox>
      <IntervalBox>
        <h4>{todoObj.defaultSet}</h4>
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
  height: 100px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: ${Normal_Gray2};
  cursor: pointer;
  @media screen and (max-height: 800px) {
    height: 90px;
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
  height: 5px;
`;
const IntervalBar = styled.li`
  display: flex;
  background-color: ${Normal_Gray3};
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;

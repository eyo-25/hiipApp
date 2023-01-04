import { IoPlaySharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dark_Gray2, Normal_Gray2, Normal_Gray3 } from "../../../Styles/Colors";
import { dbService } from "../../../firebase";
import { resultColor, statusColor, statusName } from "../../../Utils/interface";
import { ItimeState } from "../../../Recoil/atoms";

function TodoCard({ todoObj }: any) {
  // const [intervalArray, setIntervalArray] = useState<any[]>();
  const [timerObj, setTimerObj] = useState<ItimeState>();
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");

  let intervalArray = [] as any;
  for (let index = 0; index < todoObj.defaultSet; index++) {
    if (timerObj) {
      if (timerObj.status === "fail") {
        const defaultSet = todoObj.defaultSet - timerObj.focusSet;
        if (index < defaultSet) {
          intervalArray[index] = "default";
        } else {
          intervalArray[index] = "fail";
        }
      } else {
        const defaultSet = todoObj.defaultSet - timerObj.addSet;
        if (index < defaultSet) {
          intervalArray[index] = "default";
        } else {
          intervalArray[index] = "extend";
        }
      }
    } else {
      intervalArray[index] = "default";
    }
  }

  useEffect(() => {
    dbService
      .collection("plan")
      .doc(todoObj.id)
      .collection("timer")
      .where("date", "==", now)
      .get()
      .then((result) => {
        result.forEach((result: any) => {
          setTimerObj(result.data());
        });
      });
  }, []);

  return (
    <DragBox>
      <TextBox>
        <TitleBox>
          <h4>{todoObj.planTitle}</h4>
          <StatusBox>
            {todoObj.status !== "ready" && timerObj && (
              <StatusBox
                style={{ backgroundColor: statusColor[timerObj.status] }}
              >
                <h5>{statusName[timerObj.status]}</h5>
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
        {intervalArray.map((item: any, index: number) => (
          <IntervalBar
            style={{ backgroundColor: resultColor[item] }}
            key={index}
          />
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

import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { endTodoState, startTodoState } from "../../../Recoil/atoms";
import { DdayBox, fadeinVariants } from "./ProjectInfo";
import { useEffect, useState } from "react";

interface IDetailInfo {
  onBackClick: () => void;
  projectDday: string;
}

function DetailInfo({ onBackClick, projectDday }: IDetailInfo) {
  const [startTodos, setStartTodos] = useRecoilState(startTodoState);
  const [endTodos, setEndTodos] = useRecoilState(endTodoState);
  const [detailObj, setDetailObj] = useState<any>({
    planPercent: 0,
    addSet: 0,
    successPercent: 0,
  });

  const Moment = require("moment");
  useEffect(() => {
    if (0 < startTodos.length) {
      setDetailObj(() => {
        const startDate = Moment(startTodos[0].startDate);
        const endDate = Moment(startTodos[0].endDate);
        const totalDiff = endDate.diff(startDate, "days") + 1;
        const timerIndex = startTodos[0].timerIndex;
        return {
          progressSet:
            startTodos[0].timerSetFocusSet - startTodos[0].timerFocusSet,
          planPercent: Math.round((timerIndex / totalDiff) * 100),
          addSet: startTodos[0].timerAddSet,
          successPercent: Math.round(
            (startTodos[0].successCount / totalDiff) * 100
          ),
        };
      });
    } else if (0 < endTodos.length) {
      setDetailObj(() => {
        const startDate = Moment(endTodos[0].startDate);
        const endDate = Moment(endTodos[0].endDate);
        const totalDiff = endDate.diff(startDate, "days") + 1;
        const timerIndex = endTodos[0].timerIndex;
        return {
          planPercent: Math.round((timerIndex / totalDiff) * 100),
          addSet: endTodos[0].timerAddSet,
          successPercent: Math.round(
            (endTodos[0].successCount / totalDiff) * 100
          ),
        };
      });
    } else {
      setDetailObj(() => {
        return {
          planPercent: 0,
          addSet: 0,
          successPercent: 0,
        };
      });
    }
  }, []);

  return (
    <>
      <DdayBox
        onClick={onBackClick}
        variants={fadeinVariants}
        initial="normal"
        animate="animate"
      >
        <p>{projectDday}</p>
        <span>D.day</span>
      </DdayBox>
      <DetailBox
        onClick={onBackClick}
        variants={fadeinVariants}
        initial="normal"
        animate="animate"
      >
        <DetailItems>
          <DetailItem>
            <p>{detailObj.progressSet}</p>
            <span>SET</span>
          </DetailItem>
          <DetailText>진행 세트</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>{detailObj.successPercent}</p>
            <span>%</span>
          </DetailItem>
          <DetailText>계획 성공</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>{detailObj.addSet}</p>
            <span>SET</span>
          </DetailItem>
          <DetailText>오늘 추가됨</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>{detailObj.planPercent}</p>
            <span>%</span>
          </DetailItem>
          <DetailText>계획 진행</DetailText>
        </DetailItems>
      </DetailBox>
    </>
  );
}

export default DetailInfo;

const DetailBox = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 12.5%;
  padding: 0 2.5vh;
`;
const DetailItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  color: white;
`;
const DetailText = styled.div`
  font-size: 1.5vh;
  font-weight: 100;
`;
const DetailItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 7%;
  p {
    font-weight: 600;
    font-size: 20px;
    padding-right: 5px;
    @media screen and (max-height: 800px) {
      font-size: 18px;
    }
  }
  span {
    font-weight: 400;
    font-size: 18px;
    @media screen and (max-height: 800px) {
      font-size: 16px;
    }
  }
`;

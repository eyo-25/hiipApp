import { motion } from "framer-motion";
import styled from "styled-components";
import { DdayBox, fadeinVariants } from "./ProjectInfo";

interface IDetailInfo {
  onBackClick: () => void;
  projectDday: string;
}

function DetailInfo({ onBackClick, projectDday }: IDetailInfo) {
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
            <p>4</p>
            <span>SET</span>
          </DetailItem>
          <DetailText>전날 밀림</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>100</p>
            <span>%</span>
          </DetailItem>
          <DetailText>계획 성공</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>4</p>
            <span>SET</span>
          </DetailItem>
          <DetailText>오늘 추가됨</DetailText>
        </DetailItems>
        <DetailItems>
          <DetailItem>
            <p>100</p>
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

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoEditState } from "../../../Recoil/atoms";
import { Blue, Dark_Gray, Dark_Gray2 } from "../../../Styles/Colors";

function TodoCard({
  setIsWeek,
}: {
  setIsWeek: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const intervalArray = [3, 2, 1];
  const [isEdit, setIsEdit] = useRecoilState(toDoEditState);
  const [isSelect, setIsSelect] = useState(false);
  const [isMemo, setIsMemo] = useState(false);

  useEffect(() => {
    if (!isMemo) {
      setIsSelect(false);
    }
  }, [isEdit]);

  const cardVariants = {
    normal: {
      height: "162px",
    },
    animate: {
      height: isMemo ? "405px" : isSelect ? "262px" : "162px",
      transition: {
        duration: 0.7,
        type: "linear",
      },
    },
  };

  const onCardClick = () => {
    setIsSelect((prev) => !prev);
    setIsMemo(false);
  };
  const onMemoClick = () => {
    setIsSelect(true);
    if (isSelect) {
      setIsMemo(true);
      setIsWeek(true);
      setIsEdit(true);
    }
    if (isMemo) {
      setIsMemo(false);
      setIsSelect(false);
      setIsEdit(false);
    }
  };
  return (
    <TodoCarWrapper variants={cardVariants} initial="normal" animate="animate">
      <TodoTopBox>
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
      </TodoTopBox>
      <MemoContainer onClick={onMemoClick}>
        <MemoText>
          계획 실천 후 피드백이나 <br />
          실천 중 메모를 적어주세요
        </MemoText>
      </MemoContainer>
      <IntervalBarBox>
        {intervalArray.map((index) => (
          <IntervalBar key={index} />
        ))}
      </IntervalBarBox>
      <Background onClick={onCardClick} />
    </TodoCarWrapper>
  );
}

export default TodoCard;

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
const TodoCarWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 25px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  @media screen and (max-height: 800px) {
    margin-bottom: 20px;
  }
`;
const TodoTopBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
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
  height: 5px;
`;
const IntervalBar = styled.li`
  display: flex;
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;
const MemoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 5;
`;
const MemoText = styled.h4`
  color: ${Dark_Gray};
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 1.3;
`;

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { selectState, toDoEditState } from "../../../Recoil/atoms";
import { Blue, Dark_Gray, Dark_Gray2 } from "../../../Styles/Colors";
import { scrollIntoView } from "seamless-scroll-polyfill";
import { useNavigate } from "react-router-dom";

export const iconVariants = {
  normal: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 1,
      type: "linear",
    },
  },
};

function TodoCard({
  setIsWeek,
  index,
  todoId,
  memo,
}: {
  setIsWeek: React.Dispatch<React.SetStateAction<boolean>>;
  index: string;
  todoId: string;
  memo: string;
}) {
  const navigate = useNavigate();
  const intervalArray = [3, 2, 1];
  const [isClicked, setIsClicked] = useState(false);
  const [isSelect, setIsSelect] = useRecoilState(selectState);
  const [isEdit, setIsEdit] = useRecoilState(toDoEditState);

  useEffect(() => {
    // 셀렉된 카드 전부 닫기
    if (!isSelect) {
      setIsClicked(false);
    }
  }, [isSelect]);

  const cardVariants = {
    normal: {
      height: "162px",
    },
    animate: {
      height: isClicked ? "262px" : "162px",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };

  const textVariants = {
    normal: {
      height: "42px",
    },
    animate: {
      height: isClicked ? "142px" : "39px",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };
  const clickToggle = () => {
    if (!isSelect) {
      setIsSelect(true);
      setIsClicked(true);
    }
    if (isSelect && !isClicked) {
      setIsSelect(false);
      setTimeout(() => {
        setIsSelect(true);
        setIsClicked(true);
      }, 500);
    }
  };

  const onCardClick = async () => {
    if (isSelect && isClicked) {
      setIsSelect(false);
      setIsClicked(false);
    }
    clickToggle();
  };
  const onMemoClick = () => {
    if (isSelect && isClicked) {
      setIsWeek(true);
      setIsEdit(true);
      navigate(`/plan/memo/${todoId}`);
    }
    clickToggle();
  };
  useEffect(() => {
    if (isEdit && isClicked) {
      setTimeout(() => {
        scrollIntoView(cardRef.current as any, {
          behavior: "smooth",
        });
      }, 500);
    }
  }, [isEdit]);
  const cardRef = useRef<any>(null);
  return (
    <>
      <TodoCarWrapper
        ref={cardRef}
        variants={cardVariants}
        initial="normal"
        animate="animate"
      >
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
        <MemoContainer onClick={onMemoClick} isselect={isSelect}>
          {memo !== "" ? (
            <MemoText
              variants={textVariants}
              initial="normal"
              animate="animate"
            >
              {memo}
            </MemoText>
          ) : (
            <MemoText>
              <p>
                계획 실천 후 피드백이나 <br />
                실천 중 메모를 적어주세요
              </p>
            </MemoText>
          )}
        </MemoContainer>
        <IntervalBarBox>
          {intervalArray.map((index) => (
            <IntervalBar key={index} />
          ))}
        </IntervalBarBox>
        <Background onClick={onCardClick} />
      </TodoCarWrapper>
    </>
  );
}

export default TodoCard;

export const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
export const TodoCarWrapper = styled(motion.div)`
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
export const TodoTopBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 30px;
  cursor: pointer;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: ${Dark_Gray2};
    font-size: 14px;
  }
`;
export const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  h4 {
    letter-spacing: -0.2px;
    font-weight: 700;
    margin-right: 8px;
  }
`;
export const StatusBox = styled.span`
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
export const IntervalBox = styled.div`
  display: flex;
  h4 {
    margin-right: 5px;
  }
  p {
    color: ${Dark_Gray2};
  }
`;
export const StartBtn = styled(IoPlaySharp)`
  color: ${Dark_Gray2};
  margin-left: 1.3vh;
`;
export const IntervalBarBox = styled.ul`
  position: absolute;
  display: flex;
  bottom: 0;
  padding-right: 5px;
  width: 80%;
  height: 5px;
`;
export const IntervalBar = styled.li`
  display: flex;
  background-color: black;
  height: 100%;
  width: 100%;
  margin: 0 3px;
`;
export const MemoContainer = styled.div<{ isselect: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 5;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isselect ? 9 : 2)};
  -webkit-box-orient: vertical;
`;
export const MemoText = styled(motion.div)`
  font-weight: 500;
  letter-spacing: -1px;
  line-height: 1.4;
  font-size: 14px;
  overflow: hidden;
  p {
    color: ${Dark_Gray};
  }
`;
export const MemoForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding-right: 7px;
`;
export const Item = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  svg {
    width: 27px;
    height: 27px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vh;
    font-weight: 400;
    margin-top: 5px;
    color: #cccccc;
  }
`;

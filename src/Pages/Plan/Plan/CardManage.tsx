import { motion } from "framer-motion";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Overlay, Wrapper } from "./TodoMemo";
import { useEffect, useState } from "react";
import { dbService } from "../../../firebase";

const CardManage = ({
  setIsCreate,
}: {
  setIsCreate: (value: React.SetStateAction<boolean>) => void;
}) => {
  const Moment = require("moment");
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [startDate, setStartDate] = useState<string>(
    Moment().format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>("");
  const [planTitle, setPlanTitle] = useState("");
  const [planSubTitle, setPlanSubTitle] = useState("");
  const backVariants = {
    normal: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
    },
    animate: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(1.5px)",
      transition: {
        duration: 1,
        type: "linear",
      },
    },
  };
  const slideVariants = {
    normal: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 1,
        type: "linear",
      },
    },
  };
  const onOverlayClicked = () => {
    navigate("/plan");
    setIsCreate(false);
  };
  const onCancleClicked = () => {
    navigate("/plan");
    setIsCreate(false);
  };
  const onCountUp = () => {
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };
  const onCountDown = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = window.confirm("플랜을 생성하시겠습니까?");
    if (ok) {
      const newObj = {
        endDate: endDate,
        index: 0, //임시
        intervalSet: count,
        memo: "",
        planSubTitle: planSubTitle,
        planTitle: planTitle,
        startDate: startDate,
        status: "ready",
        todoId: "a", //임시
      };
      const defaultTimeObj = {
        //나중에 뽀모도로 기본세팅으로 작성
        setIntervalSet: count,
        setBreakSet: count - 1 <= 0 ? 0 : count - 1,
        intervalSet: count,
        breakSet: count - 1 <= 0 ? 0 : count - 1,
        setMin: 0,
        setSec: 10,
        setBreakMin: 0,
        setBreakSec: 5,
        min: 0,
        sec: 10,
        breakMin: 0,
        breakSec: 5,
      };
    }
  };
  const titleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPlanTitle(value);
  };
  const subTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPlanSubTitle(value);
  };
  const startDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setStartDate(value);
  };
  const endDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEndDate(value);
  };
  return (
    <Wrapper>
      <ModalWrapper variants={slideVariants} initial="normal" animate="animate">
        <ModalForm onSubmit={onSubmit}>
          <ItemBox>
            <ItemTitle>TO-DO 제목</ItemTitle>
            <TitleInput
              value={planTitle}
              onChange={titleChange}
              placeholder="플랜 제목을 적어 주세요"
              required
            />
          </ItemBox>
          <ItemBox>
            <ItemTitle>TO-DO 목표</ItemTitle>
            <TitleInput
              value={planSubTitle}
              onChange={subTitleChange}
              placeholder="실행할 목표를 적어 주세요"
              required
            />
          </ItemBox>
          <ItemBox>
            <InputItem>
              <HorizonTitle>인터벌 세트</HorizonTitle>
              <ItemInput as="div">
                <CountBox>
                  <DownBtn onClick={onCountDown} />
                  {count}
                  <UpBtn onClick={onCountUp} />
                </CountBox>
              </ItemInput>
            </InputItem>
          </ItemBox>
          <ItemWrapper>
            <ItemBox>
              <ItemTitle>시작 날짜</ItemTitle>
              <DateInput
                value={startDate}
                onChange={startDateChange}
                required
              />
            </ItemBox>
            <ItemBox>
              <ItemTitle>종료 날짜</ItemTitle>
              <DateInput value={endDate} onChange={endDateChange} required />
            </ItemBox>
          </ItemWrapper>
          <BtnBox>
            <CancelBtn onClick={onCancleClicked}>취소</CancelBtn>
            <ConfirmBtn>생성</ConfirmBtn>
          </BtnBox>
        </ModalForm>
      </ModalWrapper>
      <Overlay
        onClick={onOverlayClicked}
        variants={backVariants}
        initial="normal"
        animate="animate"
      />
    </Wrapper>
  );
};

export default CardManage;
const ModalWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  padding: 4vh;
  height: 45vh;
  width: 100%;
  background-color: white;
  z-index: 999;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  max-width: 414px;
  @media screen and (max-height: 896px) {
    height: 50vh;
  }
  @media screen and (max-height: 770px) {
    height: 400px;
  }
  @media screen and (max-height: 600px) {
    padding: 20px;
    height: 360px;
  }
`;
const ModalForm = styled(motion.form)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemTitle = styled.div`
  color: #9d9d9d;
  font-weight: 600;
  margin-bottom: 10px;
`;
const HorizonTitle = styled.div`
  display: flex;
  align-items: center;
  color: #9d9d9d;
  font-weight: 600;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  @media screen and (max-height: 750px) {
    margin-bottom: 2vh;
  }
  @media screen and (max-height: 600px) {
    margin-bottom: 10px;
  }
  input {
    border: none;
    border-radius: 4px;
    background-color: #f5f5f5;
    height: 35px;
    display: flex;
    text-align: center;
    font-size: 12px;
  }
`;
const TitleInput = styled.input`
  width: 100%;
`;
const DateInput = styled.input`
  width: 165px;
  @media screen and (max-width: 414px) {
    width: 155px;
  }
  @media screen and (max-width: 377px) {
    width: 145px;
  }
`;

const InputItem = styled.li`
  display: flex;
  justify-content: space-between;
`;
const ItemInput = styled.input`
  position: relative;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 35px;
  width: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  @media screen and (max-width: 414px) {
    width: 155px;
  }
  @media screen and (max-width: 377px) {
    width: 145px;
  }
`;
const BtnBox = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  font-size: 14px;
  margin-top: 1vh;
  @media screen and (max-height: 896px) {
    margin-top: 10px;
  }
`;
const ConfirmBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  width: 50%;
  border: 1px solid black;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`;
const CancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50%;
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  cursor: pointer;
`;
const CountBox = styled.div`
  width: 100%;
`;
const DownBtn = styled(IoRemoveCircle)`
  position: absolute;
  left: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
const UpBtn = styled(IoAddCircle)`
  position: absolute;
  right: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

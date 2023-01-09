import { motion } from "framer-motion";
import { useRef } from "react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dbService } from "../../../firebase";
import {
  clickDateState,
  createEndDateState,
  createStartDateState,
  createSubTitleState,
  createTitleState,
  endDateState,
  isCreateState,
  isTodoEditState,
  loadState,
  projectState,
  startDateState,
  toDoState,
} from "../../../Recoil/atoms";

interface ICreateInput {
  setStartToggle: (value: React.SetStateAction<boolean>) => void;
  setEndToggle: (value: React.SetStateAction<boolean>) => void;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  mode: string;
  planStatus: string;
}

function CreateInput({
  setStartToggle,
  setEndToggle,
  count,
  setCount,
  mode,
  planStatus,
}: ICreateInput) {
  const navigate = useNavigate();
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isCreate, setIsCreate] = useRecoilState(isCreateState);
  const [inputStartDate, setInputStartDate] =
    useRecoilState(createStartDateState);
  const [inputEndDate, setInputEndDate] = useRecoilState(createEndDateState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [planTitle, setPlanTitle] = useRecoilState(createTitleState);
  const [planSubTitle, setPlanSubTitle] = useRecoilState(createSubTitleState);
  const [isTodoEdit, setIsTodoEdit] = useRecoilState(isTodoEditState);
  const [isLoad, setIsLoad] = useRecoilState(loadState);
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const uid = JSON.parse(localStorage.getItem("user") as any).uid;
  const projectIndex = project.findIndex((item: any) => item.select === "true");
  const params = useParams();
  const todoId = params.todoId;
  const index = toDos.findIndex((item) => item.id === todoId);

  const onCancleClicked = () => {
    if (mode === "CREATE") {
      setIsCreate(false);
    } else {
      setIsTodoEdit(false);
    }
    navigate("/plan");
  };
  const onCountUp = () => {
    if (mode !== "CREATE" && toDos[index].status !== "ready") {
      alert(
        "현재 진행중인 TODO입니다. 해당TODO를 시작하고 '추가'를 통해 세트를 변경해 주세요"
      );
      return;
    }
    if (count >= 10) return;
    setCount((prev) => prev + 1);
  };
  const onCountDown = () => {
    if (mode !== "CREATE" && toDos[index].status !== "ready") {
      alert(
        "현재 진행중인 TODO입니다. 해당TODO를 시작하고 '추가'를 통해 세트를 변경해 주세요"
      );
      return;
    }
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };
  //파이어베이스 ToDo생성 요청
  async function createToDoSubmit() {
    setToDos([]);
    setIsLoad(true);
    try {
      const planObj = {
        index: project[projectIndex].indexcount + 1,
        timerIndex: 0,
        successCount: 0,
        defaultSet: count,
        memo: "",
        planSubTitle: planSubTitle,
        planTitle: planTitle,
        startDate: inputStartDate,
        endDate: inputEndDate,
        status: "ready",
        uId: uid,
        projectId: project[projectIndex].id,
        addSet: 0,
      };
      const createTodoFbase = () => dbService.collection("plan").add(planObj);
      const increaseIndexCounteFbase = () =>
        dbService
          .collection("project")
          .doc(project[projectIndex].id)
          .update({ indexcount: project[projectIndex].indexcount + 1 });
      await Promise.all([createTodoFbase(), increaseIndexCounteFbase()]);
    } catch (e) {
      setIsLoad(false);
      alert(
        "서버 오류가 발생하여 To-Do생성이 실패 하였습니다. 다시 To-Do를 생성해 주세요."
      );
    } finally {
      setIsLoad(false);
    }
  }
  //파이어베이스 ToDo수정 요청
  async function editToDoSubmit() {
    setIsLoad(true);
    try {
      const editObj = {
        defaultSet: count,
        planSubTitle: planSubTitle,
        planTitle: planTitle,
        startDate: inputStartDate,
        endDate: inputEndDate,
      };
      await dbService.collection("plan").doc(todoId).update(editObj);
    } catch (e) {
      alert(
        "서버 오류가 발생하여 To-Do수정이 실패 하였습니다. 다시 To-Do를 수정해 주세요."
      );
    } finally {
      setIsLoad(false);
    }
  }

  //todo카드 생성 클릭
  const onCreateCardClick = async () => {
    const isRequired: boolean =
      inputStartDate === "" ||
      inputEndDate === "" ||
      planTitle === "" ||
      planSubTitle === "";
    const requiredMessage = () => {
      if (planTitle === "" || planSubTitle === "") {
        alert("To-Do 제목을 설정해 주세요");
        return;
      } else if (inputStartDate === "" || inputEndDate === "") {
        alert("To-Do 날짜를 설정해 주세요");
        return;
      }
    };
    if (mode === "CREATE") {
      if (isRequired) {
        requiredMessage();
      } else {
        const ok = window.confirm("To-Do를 생성하시겠습니까?");
        if (ok) {
          createToDoSubmit().then(() => {
            if (inputStartDate <= clickDate && clickDate <= inputEndDate) {
              setStartDate(inputStartDate);
              setEndDate(inputEndDate);
            }
            navigate("/plan");
            setIsCreate(false);
          });
        }
      }
    } else if (mode === "EDIT") {
      if (isRequired) {
        requiredMessage();
      } else {
        const ok = window.confirm("To-Do를 수정하시겠습니까?");
        if (ok) {
          setIsTodoEdit(false);
          editToDoSubmit();
          for (let i = 0; i < toDos.length; i++) {
            if (toDos[index].id === toDos[i].id) {
              continue;
            }
            if (
              toDos[i].startDate <= clickDate &&
              clickDate <= toDos[i].endDate
            ) {
              setStartDate(toDos[i].startDate);
              setEndDate(toDos[i].endDate);
              break;
            } else if (i + 1 === toDos.length) {
              setStartDate("");
              setEndDate("");
            }
          }
          navigate("/plan");
        }
      }
    }
  };

  const startDateInput = useRef<any>();

  //인풋 관리
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
    setInputStartDate(value);
  };
  const endDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setInputEndDate(value);
  };
  const onStartDateFocus = () => {
    if (mode === "CREATE" || (mode === "EDIT" && planStatus === "ready")) {
      setStartToggle(true);
      setEndToggle(false);
    } else {
      startDateInput.current.blur();
      alert("측정이 시작된 후 시작날짜는 변경할수 없습니다.");
    }
  };

  return (
    <ModalForm onSubmit={onCreateCardClick}>
      <ItemBox>
        <ItemTitle>TO-DO 제목</ItemTitle>
        <TitleInput
          value={planTitle}
          onChange={titleChange}
          placeholder="To-Do를제목을 적어 주세요"
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
            ref={startDateInput}
            value={inputStartDate}
            onChange={startDateChange}
            inputMode="none"
            onFocus={onStartDateFocus}
          />
        </ItemBox>
        <ItemBox>
          <ItemTitle>종료 날짜</ItemTitle>
          <DateInput
            value={inputEndDate}
            onChange={endDateChange}
            onFocus={() => {
              setStartToggle(false);
              setEndToggle(true);
            }}
            inputMode="none"
          />
        </ItemBox>
      </ItemWrapper>
      <BtnBox>
        <CancelBtn type="button" onClick={onCancleClicked}>
          취소
        </CancelBtn>
        <ConfirmBtn type="button" onClick={onCreateCardClick}>
          {mode === "CREATE" ? "생성" : "수정"}
        </ConfirmBtn>
      </BtnBox>
    </ModalForm>
  );
}

export default CreateInput;

const ModalForm = styled(motion.form)`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 25px;
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
  position: relative;
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

import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import { useEffect } from "react";
import { authService, dbService } from "../../firebase";
import { feedBackTodoState, ITodo, projectState } from "../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import FeedBackBorad from "./FeedBackBorad";
import { useParams } from "react-router-dom";
import FeedBackDefault from "./FeedBackDefault";

function FeedBack() {
  const [project, setProject] = useRecoilState(projectState);
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  const params = useParams();
  const todoId = params.todoId;

  //프로젝트 변경 감지
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user") as any).uid;
    const q = query(dbService.collection("project").where("uid", "==", uid));
    const addId = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProject(newArray);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        addId();
      }
    });
  }, []);

  //투두 변경 감지
  useEffect(() => {
    if (0 < project.length && !todoId) {
      const q = query(
        dbService
          .collection("plan")
          .where("projectId", "==", project[0].id)
          .orderBy("index", "desc")
          .limit(1)
      );
      const addId = onSnapshot(q, (querySnapshot) => {
        const newArray = querySnapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setFeedBackTodo(newArray);
      });
      onAuthStateChanged(authService, (user) => {
        if (user == null) {
          addId();
        }
      });
    }
    if (todoId) {
      dbService
        .collection("plan")
        .doc(todoId)
        .get()
        .then((result: any) => {
          result.forEach((resultData: any) => {
            const newObj = {
              id: todoId,
              ...resultData.data(),
            };
            setFeedBackTodo(newObj);
          });
        });
    }
  }, [project]);

  return (
    <Applayout>
      <FeedBackContainer>
        {0 < feedBackTodo.length ? <FeedBackBorad /> : <FeedBackDefault />}
      </FeedBackContainer>
    </Applayout>
  );
}

export default FeedBack;

const FeedBackContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: flex-start;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

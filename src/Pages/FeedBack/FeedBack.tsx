import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import CoachEvaluation from "./CoachEvaluation";
import { useEffect, useState } from "react";
import { authService, dbService } from "../../firebase";
import {
  feedBackTimerState,
  feedBackTodoState,
  projectState,
} from "../../Recoil/atoms";
import { useRecoilState } from "recoil";
import { onSnapshot, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SuccessPossibility from "./SuccessPossibility/SuccessPossibility";
import SuccessPercent from "./SuccessPercent";

function FeedBack() {
  const [project, setProject] = useRecoilState(projectState);
  const [feedBackTodo, setFeedBackTodo] = useRecoilState(feedBackTodoState);
  const [feedBackTimerObj, setFeedBackTimerObj] =
    useRecoilState(feedBackTimerState);
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");
  // 초기화
  //투두 변경 감지
  useEffect(() => {
    if (project.length > 0) {
      const projectIndex = project.findIndex(
        (item: any) => item.select === "true"
      );
      const q = query(
        dbService
          .collection("plan")
          .where("projectId", "==", project[projectIndex].id)
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
    } else {
      setFeedBackTodo([]);
    }
    return () => setFeedBackTodo([]);
  }, [project]);
  useEffect(() => {
    if (0 < feedBackTodo.length && feedBackTodo[0].status !== "ready") {
      dbService
        .collection("plan")
        .doc(feedBackTodo[0].id)
        .collection("timer")
        .where("date", "==", now)
        .get()
        .then((result) => {
          if (!result.empty) {
            result.forEach((resultData) => {
              setFeedBackTimerObj(resultData.data());
            });
          }
        });
    }
  }, [feedBackTodo]);

  return (
    <Applayout>
      <FeedBackContainer>
        <Container>
          <CoachEvaluation />
          <SuccessPossibility />
          <SuccessPercent />
          <Box4></Box4>
        </Container>
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
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding-bottom: calc(var(--vh, 1vh) * 18);
  h2 {
    font-family: "Roboto";
    font-weight: 800;
    font-size: 8vh;
  }
  h3 {
    font-size: 2.5vh;
    font-weight: 600;
    line-height: 1.2;
  }
  span {
    font-family: "Roboto";
    font-weight: 800;
    font-size: 5vh;
  }
`;
const Box4 = styled.div`
  display: flex;
  height: calc(var(--vh, 1vh) * 45);
  width: 100%;
  background-color: aquamarine;
`;

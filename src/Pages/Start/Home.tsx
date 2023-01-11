import { useEffect, useState, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import {
  endTodoState,
  homeSplashState,
  projectState,
  startTodoState,
  toDoState,
} from "../../Recoil/atoms";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomeSplash from "../../Component/HomeSplash";
import Start from "./Start/Start";

function Home() {
  const [startTodos, setStartTodos] = useRecoilState<any[]>(startTodoState);
  const [endTodos, setEndTodos] = useRecoilState<any[]>(endTodoState);
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");
  const [isHomeSplash, setIsHomeSplash] = useRecoilState(homeSplashState);
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);

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
    if (project.length > 0) {
      const projectIndex = project.findIndex(
        (item: any) => item.select === "true"
      );
      const q = query(
        dbService
          .collection("plan")
          .where("projectId", "==", project[projectIndex].id)
          .orderBy("index", "desc")
      );
      const addId = onSnapshot(q, (querySnapshot) => {
        const newArray = querySnapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setToDos(newArray);
      });
      onAuthStateChanged(authService, (user) => {
        if (user == null) {
          addId();
        }
      });
    } else {
      setToDos([]);
    }
    return () => setToDos([]);
  }, [project]);

  useEffect(() => {
    return () => {
      setStartTodos([]);
      setEndTodos([]);
    };
  }, []);

  useEffect(() => {
    if (0 < toDos.length) {
      for (let i = 0; i < toDos.length; i++) {
        if (now < toDos[i].startDate || toDos[i].endDate < now) {
          continue;
        }
        dbService
          .collection("plan")
          .doc(toDos[i].id)
          .collection("timer")
          .where("date", "==", now)
          .get()
          .then((result) => {
            if (!result.empty) {
              result.forEach((timerResult) => {
                if (timerResult.data().status === "start") {
                  setStartTodos((prev) => {
                    const copy: any[] = [...prev];
                    const startTodoObj = {
                      ...toDos[i],
                      focusSet: timerResult.data().focusSet,
                      addSet: timerResult.data().addSet,
                      timerStatus: timerResult.data().status,
                    };
                    const index = copy.findIndex(
                      (item) => item.id === toDos[i].id
                    );
                    if (index < 0) {
                      copy.push(startTodoObj);
                    }
                    return [...copy];
                  });
                } else {
                  setEndTodos((prev) => {
                    const copy: any[] = [...prev];
                    const endTodoObj = {
                      ...toDos[i],
                      focusSet: timerResult.data().focusSet,
                      addSet: timerResult.data().addSet,
                      timerStatus: timerResult.data().status,
                    };
                    const index = copy.findIndex(
                      (item) => item.id === toDos[i].id
                    );
                    if (index < 0) {
                      copy.push(endTodoObj);
                    }
                    return [...copy];
                  });
                }
              });
            } else {
              setStartTodos((prev) => {
                const copy: any[] = [...prev];
                const startTodoObj = {
                  ...toDos[i],
                  focusSet: 0,
                  addSet: 0,
                  timerStatus: "ready",
                };
                const index = copy.findIndex((item) => item.id === toDos[i].id);
                if (index < 0) {
                  copy.push(startTodoObj);
                }
                return [...copy];
              });
            }
          });
      }
    }
  }, [toDos]);

  if (isHomeSplash) {
    return <HomeSplash />;
  }
  return <Start />;
}

export default Home;

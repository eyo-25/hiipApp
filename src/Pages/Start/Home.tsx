import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { homeSplashState, projectState, toDoState } from "../../Recoil/atoms";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import HomeSplash from "../../Component/HomeSplash";
import Start from "./Start/Start";

function Home() {
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
  }, [project, isHomeSplash]);

  const [startTodos, setStartTodos] = useState([]);
  const [endTodos, setEndTodos] = useState([]);
  const [timerArray, setTimerArray] = useState<any[]>([{}, {}, {}, {}, {}]);
  const Moment = require("moment");
  const now = Moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (0 < toDos.length) {
      for (let i = 0; i < toDos.length; i++) {
        dbService
          .collection("plan")
          .doc(toDos[i].id)
          .collection("timer")
          .where("date", "==", now)
          .get()
          .then((result) => {
            result.forEach((resultData) => {
              setTimerArray((prev) => {
                const copy = [...prev];
                let timerObj = {};
                if (resultData.data()) {
                  timerObj = {
                    focusSet: resultData.data().focusSet,
                    addSet: resultData.data().addSet,
                    status: resultData.data().status,
                  };
                } else {
                  timerObj = {
                    focusSet: 0,
                    addSet: 0,
                    status: "ready",
                  };
                }
                copy.splice(i, 1, timerObj);
                return [...copy];
              });
            });
          });
      }
    }
  }, [toDos]);

  console.log(timerArray);

  if (isHomeSplash) {
    return <HomeSplash />;
  }
  return <Start />;
}

export default Home;

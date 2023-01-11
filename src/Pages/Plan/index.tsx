import { useMatch } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Applayout from "../../Component/Applayout";
import { projectState, toDoState } from "../../Recoil/atoms";
import Plan from "./Plan/Plan";
import CreateProject from "./Project/CreateProject";
import IntervalSetting from "./Project/IntervalSetting";
import { onSnapshot, query } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Index() {
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const createMatch = useMatch("/plan/createProject");
  const intervalMatch = useMatch("/plan/intervalSetting/*");
  const isMatch = createMatch !== null || intervalMatch !== null;

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
  }, [setProject]);

  //투두 변경 감지(snapshot)
  useEffect(() => {
    if (0 < project.length) {
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
    }
    return () => setToDos([]);
  }, [project, setToDos]);

  return (
    <Applayout>
      {!isMatch && <Plan />}
      {createMatch !== null && <CreateProject />}
      {intervalMatch !== null && <IntervalSetting />}
    </Applayout>
  );
}

export default Index;

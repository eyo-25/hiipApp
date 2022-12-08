import { useEffect, useState } from "react";
import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Button from "../../Component/Button";
import { Normal_Gray } from "../../Styles/Colors";
import { motion } from "framer-motion";
import Background from "../../Assets/image/start_background2.png";
import TodoBord from "./Start/TodoBord";
import { useRecoilState } from "recoil";
import {
  clickDateState,
  homeSplashState,
  projectState,
  toDoState,
} from "../../Recoil/atoms";
import { onSnapshot, query } from "firebase/firestore";
import ProjectInfo from "./Start/ProjectInfo";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HomeSplash from "../../Component/HomeSplash";
import Start from "./Start/Start";

function Home() {
  const [isHomeSplash, setIsHomeSplash] = useRecoilState(homeSplashState);
  const [project, setProject] = useRecoilState(projectState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const navigate = useNavigate();

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

  if (isHomeSplash) {
    return <HomeSplash />;
  }
  return <Start />;
}

export default Home;

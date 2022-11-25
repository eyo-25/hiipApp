import { useEffect, useState } from "react";
import styled from "styled-components";
import Applayout from "../../Component/Applayout";
import Button from "../../Component/Button";
import { Normal_Gray } from "../../Styles/Colors";
import { motion } from "framer-motion";
import Background from "../../Assets/image/start_background2.png";
import TodoBord from "./Home/TodoBord";
import { useRecoilState } from "recoil";
import { toDoState } from "../../Recoil/atoms";
import { onSnapshot, query } from "firebase/firestore";
import ProjectInfo from "./Home/ProjectInfo";
import { authService, dbService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

function Home() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [isReady, setIsReady] = useState(false);
  const [isFadeout, setIsFadeout] = useState(false);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const [tochedY, setTochedY] = useState(0);
  const uid = JSON.parse(localStorage.getItem("user") as any).uid;

  // useEffect(() => {
  //   const q = query(
  //     dbService
  //       .collection("plan")
  //       .where("creatorId", "==", uid)
  //       .orderBy("index", "desc")
  //   );
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newArray = querySnapshot.docs.map((doc: any) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       };
  //     });
  //     setToDos(() => {
  //       const newArray2 = newArray.map((e) => {
  //         e.startDate = e.startDate.toDate();
  //         e.endDate = e.endDate.toDate();
  //         return e;
  //       });
  //       return newArray2;
  //     });
  //   });
  //   onAuthStateChanged(authService, (user) => {
  //     if (user == null) {
  //       unsubscribe();
  //     }
  //   });
  // }, []);

  const bottomVariants = {
    normal: {
      height: "0vh",
      opacity: 0,
      transition: {
        duration: 0.8,
        type: "linear",
      },
    },
    animate: {
      height: isReady && toDos.length > 0 ? "57%" : "23%",
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "linear",
      },
    },
  };
  const bgVariants = {
    normal: {
      background: "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4))",
    },
    animate: {
      background: isFadeout
        ? "linear-gradient(rgba(0, 0, 0, 0.5), 40%, rgba(0, 0, 0, 0.9))"
        : "linear-gradient(rgba(0, 0, 0, 0), 40%, rgba(0, 0, 0, 0.4))",
      transition: {
        duration: 0.5,
        type: "linear",
      },
    },
  };
  const onPlayClick = () => {
    //타이머로 이꾸
  };
  const onBackClick = () => {
    setIsReady(false);
    setTimeout(() => {
      setIsFadeout(false);
    }, 400);
  };

  // 브라우저 스와이프
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };
  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (distanceY < -30) {
      setIsReady(false);
      setTimeout(() => {
        setIsFadeout(false);
      }, 400);
    }
    if (distanceY > 30) {
      if (toDos.length <= 0) return;
      setIsReady(true);
      setTimeout(() => {
        setIsFadeout(true);
      }, 400);
    }
  }, [mouseUpClientY]);
  //모바일 스와이프
  const onTouchStart = (e: React.TouchEvent) => {
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;
    if (distanceY < -30) {
      setIsReady(false);
      setTimeout(() => {
        setIsFadeout(false);
      }, 400);
    }
    if (distanceY > 30) {
      if (toDos.length <= 0) return;
      setIsReady(true);
      setTimeout(() => {
        setIsFadeout(true);
      }, 400);
    }
  };
  //모바일 스와이프2
  const onTouchStart2 = (e: React.TouchEvent) => {
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd2 = (e: React.TouchEvent) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;
    if (distanceY > 30) {
      if (toDos.length <= 0) return;
      setIsReady(true);
      setTimeout(() => {
        setIsFadeout(true);
      }, 400);
    }
  };

  return (
    <Applayout>
      <ContentContainer onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <BackgroundImg />
        <BackContainer
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          isFadeout={isFadeout && toDos.length > 0}
        >
          <ProjectContainer>
            <ProjectInfo isReady={isReady} onBackClick={onBackClick} />
          </ProjectContainer>
        </BackContainer>
        <BackgroundCover
          variants={bgVariants}
          initial="normal"
          animate="animate"
        />
        <TodoContainer
          onTouchStart={onTouchStart2}
          onTouchEnd={onTouchEnd2}
          variants={bottomVariants}
          initial="normal"
          animate="animate"
        >
          <TodoBord isReady={isReady} />
        </TodoContainer>
        <ButtonContainer onClick={onPlayClick}>
          <Button isPlay={toDos.length > 0 ? true : false} />
        </ButtonContainer>
      </ContentContainer>
    </Applayout>
  );
}

export default Home;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const BackContainer = styled.div<{ isFadeout: boolean }>`
  cursor: ${(props) => (props.isFadeout ? "pointer" : null)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ProjectContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 67%;
  display: flex;
`;
const TodoContainer = styled(motion.div)`
  position: absolute;
  bottom: 9.9%;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;
  z-index: 2;
  display: flex;
  width: 100%;
  padding: 3.5vh 2.5vh;
  padding-bottom: 0;
  background-color: ${Normal_Gray};
  overflow: hidden;
`;
const BackgroundCover = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
const BackgroundImg = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 65%;
`;
const ButtonContainer = styled(motion.div)`
  z-index: 99;
`;

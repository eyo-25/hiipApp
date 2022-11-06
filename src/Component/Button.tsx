import styled from "styled-components";
import { IoPlaySharp } from "react-icons/io5";
import { ReactComponent as PlusIcon } from "../Assets/Icons/plus.svg";
import { useNavigate } from "react-router-dom";

function Button() {
  return (
    <BtnBox>
      <PlayBtn />
    </BtnBox>
  );
}

export default Button;

const BtnBox = styled.button`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 15vh;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78px;
  width: 78px;
  border-radius: 50%;
  border: none;
  margin: 0 auto;
  background-color: black;
  cursor: pointer;
`;

const PlayBtn = styled(IoPlaySharp)`
  color: white;
  padding-left: 4px;
  width: 35px;
  height: 35px;
`;

const PlusBtn = styled(PlusIcon)`
  color: white;
  width: 30px;
  height: 30px;
`;

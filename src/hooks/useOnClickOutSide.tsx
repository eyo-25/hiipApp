import React, { useEffect } from "react";

const useOnClickOutSide = (ref: any, handler: any) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, []);
};

export default useOnClickOutSide;

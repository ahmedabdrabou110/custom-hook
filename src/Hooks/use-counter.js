import { useEffect, useState } from "react";

const useCounter = (initalValue, forward = true) => {
  const [counter, setCounter] = useState(initalValue);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) =>
        forward ? prevCounter + 1 : prevCounter - 1
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [initalValue, forward]);

  return counter;
};

export default useCounter;

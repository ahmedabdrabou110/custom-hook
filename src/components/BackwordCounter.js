
import useCounter from "../Hooks/use-counter";
import Card from "./Card";

const BackwordCounter = () => {
  const counter = useCounter(0, false);

  return <Card>{counter}</Card>;
};

export default BackwordCounter;

import useCounter from "../Hooks/use-counter";
import Card from "./Card";

const ForwordCounter = () => {
  const counter = useCounter(0);

  return <Card>{counter}</Card>;
};

export default ForwordCounter;

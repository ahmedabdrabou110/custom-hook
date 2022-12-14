import useHttp from "../../Hooks/use-fetch";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const createTask = (task, taskText) => {
    const generatedId = task.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const { isLoading, error, requestTasks } = useHttp();

  const enterTaskHandler = async (taskText) => {
    requestTasks(
      {
        url: "https://react-http-request-e9c3a-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(taskText)
    );
    //   setIsLoading(true);
    //   setError(null);
    //   try {
    //     const response = await fetch(
    //       "https://react-http-request-e9c3a-default-rtdb.firebaseio.com/tasks.json",
    //       {
    //         method: "POST",
    //         body: JSON.stringify({ text: taskText }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error("Request failed!");
    //     }

    //     const data = await response.json();

    //     const generatedId = data.name; // firebase-specific => "name" contains generated id
    //     const createdTask = { id: generatedId, text: taskText };

    //     props.onAddTask(createdTask);

    //   } catch (err) {
    //     setError(err.message || "Something went wrong!");
    //   }
    //   setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

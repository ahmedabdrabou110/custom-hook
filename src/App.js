import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTasks/NewTask";
import useHttp from "./Hooks/use-fetch";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, requestTasks } = useHttp();

  // const fetchTasks = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://react-http-request-e9c3a-default-rtdb.firebaseio.com/tasks.json"
  //     );

  //     if (!response.ok) {
  //       throw new Error("Request failed!");
  //     }

  //     const data = await response.json();
  //     const loadedTasks = [];

  //     for (const taskKey in data) {
  //       loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //     }

  //     setTasks(loadedTasks);
  //   } catch (err) {
  //     setError(err.message || "Something went wrong!");
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    const transformedTask = (infromation) => {
      const loadedTasks = [];
      for (const taskKey in infromation) {
        loadedTasks.push({ id: taskKey, text: infromation[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    requestTasks(
      {
        url: "https://react-http-request-e9c3a-default-rtdb.firebaseio.com/tasks.json",
      },
      transformedTask
    );
    requestTasks();
  }, [requestTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={requestTasks}
      />
    </React.Fragment>
  );
}

export default App;

import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestTasks = useCallback(async (configSettings, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configSettings.url, {
        method: configSettings.method ? configSettings.method : "GET",
        headers: configSettings.headers ? configSettings.headers : {},
        body: configSettings.body ? JSON.stringify(configSettings.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    requestTasks,
  };
};

export default useHttp;

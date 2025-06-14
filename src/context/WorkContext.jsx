import { createContext, useState } from "react";

const WorkContext = createContext();

const WorkProviderComponent = ({ children }) => {
  const [log, setLogged] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('https://workasana-backend-ecru.vercel.app/project');
      const data = await res.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchTaskData = async () => {
    try {
      const res = await fetch('https://workasana-backend-ecru.vercel.app/tasks');
      const data = await res.json();
      console.log(data);
      return data.tasks;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await fetch('https://workasana-backend-ecru.vercel.app/teams');
      const data = await res.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <WorkContext.Provider value={{ setLogged, log, fetchData, fetchTaskData, fetchTeam }}>
      {children}
    </WorkContext.Provider>
  );
};

export { WorkContext, WorkProviderComponent };

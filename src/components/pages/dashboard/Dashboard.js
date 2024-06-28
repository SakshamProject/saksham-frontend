import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    throw Error("Bug");
  }, []);
  return <div>Dashboard will be available soon...</div>;
};

export default Dashboard;

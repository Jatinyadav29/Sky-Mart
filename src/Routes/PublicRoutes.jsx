import { useContext } from "react";
import { Navigate } from "react-router";
import { MyStore } from "../Context/MyContext";

const PublicRoutes = ({ children }) => {
  const { currentUser } = useContext(MyStore);

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublicRoutes;

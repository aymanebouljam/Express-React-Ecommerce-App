import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { token, status } = useSelector((state) => state.auth);

  if (status === "loading")
    return (
      <div className="h-100 flex items-center justify-center">
        <HashLoader
          size={60}
          color="#3498db"
          loading={true}
          speedMultiplier={1.5}
          cssOverride={{ margin: "auto", display: "block" }}
        />
      </div>
    );

  if (token && status === "succeded") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;

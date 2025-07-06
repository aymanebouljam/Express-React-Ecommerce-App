import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import STATUSLABEL from "../../redux/features/constants/status";

const ProtectedRoute = ({ children }) => {
  const { token, status } = useSelector((state) => state.auth);

  const { IDLE, SUCCEEDED, LOADING, FAILED } = STATUSLABEL;

  if (status === IDLE || status === LOADING) {
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
  }

  if (token && status === SUCCEEDED) {
    return children;
  }

  if (status === FAILED) return <Navigate to="/login" />;
};

export default ProtectedRoute;

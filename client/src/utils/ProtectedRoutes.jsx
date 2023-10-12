import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    let isAuth = localStorage.getItem("user");
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
}

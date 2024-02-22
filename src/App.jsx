import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const gettingCurrentUser = async () => {
    await authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    gettingCurrentUser();
  }, []);

  return !loading ? (
    <div className=" max-w-7xl mx-auto py-4">
      <main>
        <Outlet />
      </main>
    </div>
  ) : null;
}

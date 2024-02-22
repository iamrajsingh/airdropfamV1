import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        userData && dispatch(authLogin(userData));
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  const changeRoute = () => {
    navigate("/");
  };

  return (
    <div className=" relative flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg  rounded-xl p-10 shadow-lift bg-light-gray  relative `}
      >
        <div className="mb-2 flex justify-center"></div>
        <h2 className="text-center text-2xl font-bold leading-tight text-pale-blue">
          Sign in to your account
        </h2>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="passowrd"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="shadow-lift bg-light-gray font-semibold">
              Sign in
            </Button>
            <div className="w-full flex justify-center">
              <button
                className="flex items-center gap-1 text-sm text-gray-500  font-semibold hover:text-gray-800 "
                onClick={changeRoute}
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;

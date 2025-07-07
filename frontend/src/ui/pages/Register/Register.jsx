
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {setUser} from '../../../core/redux/AuthSlice/AuthSlice'
import request from "../../../lib/remote/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate()
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const endpoint = isLogin ? "/login" : "/register";
    try {
      const response = await request({method:"POST",route:endpoint,body: formData});
      if (response.success){
        console.log("Response.data:", response.data);
        dispatch(setUser(response.data));
        nav("/");
      }
      
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left side */}
        <div className="md:w-1/2 w-full bg-gray-100 p-8 flex flex-col justify-center items-center gap-5 border-b md:border-b-0 md:border-r">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {isLogin ? "Welcome back!" : "Join us with ease!"}
          </h2>
          <p className="text-sm text-center text-gray-600">
            Use one of your social accounts to continue
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="bg-[#24292F] text-white px-4 py-2 rounded hover:opacity-90 transition flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/448232/github.svg" alt="GitHub" className="w-5 h-5" />
              Continue with GitHub
            </button>
            <button className="bg-[#3b5998] text-white px-4 py-2 rounded hover:opacity-90 transition flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/349557/facebook.svg" alt="Facebook" className="w-5 h-5" />
              Continue with Facebook
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-2 underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

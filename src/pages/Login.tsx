import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserServer } from "../api/api-user";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = await UserServer.findByUsername(formData.username);
    
    if (Object.keys(user).length === 0 || user[0].password !== formData.password) {
      toast.error("Wrong username or password");
    }
    else {
      window.sessionStorage.setItem('user', user[0].id);
      toast.success("Successfully logged in");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-fit">
      <form
        className="bg-white shadow-md rounded px-6 py-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="name"
          >
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="name"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

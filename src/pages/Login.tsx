import React, { useState } from "react";
import TextInputField from "../components/InputField";
import Button from "../components/Button";
import {Link,useNavigate} from "react-router-dom";
import axios from "../api/axios";

type LoginType = {
  email: string;
  password: string;
};
const INITIAL_VALUE: LoginType = {
  email: "",
  password: "",
};

function Login() {
  const [data, setData] = useState<LoginType>(INITIAL_VALUE);
  const updateFields = (field: Partial<LoginType>) => {
    setData((prev) => {
      return { ...prev, ...field };
    });
  };

  const navigate = useNavigate();

  const cleanUp = () => {
    updateFields({
      email: "",
      password: ""
    });
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await axios.post(`/api/teller/login`, data);

      if (response.data) {
        sessionStorage.setItem("teller-id",response?.data?.id);
        navigate("/home")
        cleanUp();
      } else {
        alert("Failed to login:Check email or password");
      }
    } catch (e) {
      alert("Failed to login:Check email or password");
    }
  };

  return (
    <div className="flex gap-5 flex-col items-center justify-center w-full h-full">
      <h3 className="font-bold text-3xl">Login</h3>
      <form onSubmit={login} className="flex flex-col gap-4">
        <TextInputField
          placeholder="Enter your email"
          value={data.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ email: e.target.value })
          }
        />
        <TextInputField
        type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateFields({ password: e.target.value })
          }
        />
        <Button />
      </form>
      <Link to={"/teller"} className="text-red-500">Add a teller </Link>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Language from "../Header/Language";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate

    // call api
    const data = await postRegister(username, email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="header">
        <span>Don't have an account yet?</span>{" "}
        <button onClick={() => navigate("/login")}>Login</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">Quiz Project</div>
      <div className="welcome col-4 mx-auto">Hello, who’s this?</div>
      <div className="content-from col-4 mx-auto">
        <div className="form-group">
          <label>User name </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isShowPassword ? (
            <div
              className="icon-eye"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <FaEye />
            </div>
          ) : (
            <div
              className="icon-eye"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <FaEyeSlash />
            </div>
          )}
        </div>

        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Register
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;

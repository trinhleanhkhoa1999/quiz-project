import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userACtion";
import { FaSpinner } from "react-icons/fa";
import Language from "../Header/Language";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Validate

    setIsLoading(true);
    // call api
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    console.log("e: ", e, e.key);
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>{" "}
        <button onClick={() => navigate("/register")}>Sign in</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">Quiz Project</div>
      <div className="welcome col-4 mx-auto">Hello, who’s this?</div>
      <div className="content-from col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <span className="forgot-password">Forgot password ?</span>
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading && <FaSpinner className="loaderIcon" />}
            <span>Login</span>
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

export default Login;

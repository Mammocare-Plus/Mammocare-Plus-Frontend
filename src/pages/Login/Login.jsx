import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../utils/config";
import jwtDecode from "jwt-decode";
import { endpoints } from "../../utils/config";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initialState = {
    username: "",
    password: "",
  };

  const [loginState, setState] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = endpoints.login;

      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...loginState,
        }),
      });
      setLoading(false);

      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.status === 200) {
        toast.success("Login Successful");
        console.log(data.tokens);
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("accessToken", data.tokens.access);
        navigate(`/inference`);
        // call check doctor api, set local storage
        // if doctor nav to doctor profile
        // if patient nav to patient profile (for now inference)
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col items-center h-[100%] w-[100%] mainContainer dark:mainContainerDark relative overflow-hidden">
        <div className="w-[30rem]  z-10 flex flex-col items-center mt-[2rem]">
          <div className="headerText rainbowText">Login</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center mt-[2rem]"
          >
            <div className="inputLight dark:inputDark">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={loginState.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={loginState.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="primaryButton dark:primaryButtonDark mt-[2rem] px-[3rem] py-[1rem]"
            >
              Login
            </button>
          </form>

          <div className="primaryText dark:primaryTextDark mt-[2rem]">
            Not Registered?{" "}
            <span
              onClick={() => {
                navigate(`/register-user`);
              }}
              className="text-[#0C4CDA] cursor-pointer hover:underline"
            >
              Register
            </span>
          </div>
        </div>
        <div className="gradCircle -bottom-[20rem]"></div>
        <div className="gradCircle -right-[20rem]"></div>
        <div className="gradCircle -left-[20rem]"></div>
      </div>
    </>
  );
};

export default Login;

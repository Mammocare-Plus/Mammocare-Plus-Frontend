import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../../components/GradientCircle/GradientCircle";
import { baseURL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";

const RegisterPatient = () => {
  const navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [{ name, username, email, password }, setState] =
    useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseURL}/register-doctor`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
  };

  return (
    <>
      <div className="flex flex-col items-center h-[100%] w-[100%] mainContainer dark:mainContainerDark relative overflow-hidden">
        <div className="w-[30rem]  z-10 flex flex-col items-center mt-[2rem]">
          <div className="headerText rainbowText">Patient</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center mt-[2rem]"
          >
            <div className="inputLight dark:inputDark">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Password</label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="primaryButton dark:primaryButtonDark mt-[2rem] px-[3rem] py-[1rem]"
            >
              Register
            </button>
          </form>

          <div className="primaryText dark:primaryTextDark mt-[2rem]">
            Already Registered?{" "}
            <span
              onClick={() => {
                navigate(`/login`);
              }}
              className="text-[#0C4CDA] cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </div>
        <div className="gradCircle -bottom-[20rem]"></div>
        <div className="gradCircle -right-[20rem]"></div>
        <div className="gradCircle -left-[20rem]"></div>
        <Loader loading={loading} />
      </div>
    </>
  );
};

export default RegisterPatient;

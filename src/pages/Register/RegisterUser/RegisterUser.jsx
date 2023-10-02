import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../../components/GradientCircle/GradientCircle";
import { baseURL } from "../../../utils/config";
import Loader from "../../../components/Loader/Loader";
import jwtDecode from "jwt-decode";
import { endpoints } from "../../../utils/config";

const RegisterUser = () => {
  const navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  const initialState = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
  };

  const [registerState, setState] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Registration successful");
    // setTimeout(() => {
    //   // Use history.push to navigate to the home page
    //   navigate("/");
    // }, 1000);

    setLoading(true);
    try {
      const url = endpoints.registerUser;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...registerState,
          phoneNumber: `${registerState.phoneNumber}`,
        }),
      });
      setLoading(false);
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.status === 201) {
        const patientUrl = endpoints.patients;
        const responsePatient = await fetch(patientUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: data.id,
          }),
        });

        console.log(responsePatient);
        localStorage.setItem("userId", data.id);
        if (responsePatient.status === 201) {
          toast.success("Registration Successful");
          navigate("/login");
        } else {
          toast.error("An error occured");
        }
      } else {
        toast.error("An error occured");
      }
    } catch (error) {
      setLoading(false);
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
          <div className="headerText rainbowText">Register</div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center mt-[2rem]"
          >
            <div className="inputLight dark:inputDark">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={registerState.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={registerState.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={registerState.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={registerState.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
              />
            </div>
            <div className="inputLight dark:inputDark">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={registerState.age}
                onChange={handleChange}
                placeholder="Enter your age"
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
      </div>
    </>
  );
};

export default RegisterUser;

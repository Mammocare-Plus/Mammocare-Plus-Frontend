import React from "react";
import SelectUserImg from "../../assets/SelectUserImg.png";
import { useNavigate } from "react-router-dom";

const SelectUser = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[100%] w-[100%] mainContainer dark:mainContainerDark">
        <div className="bg-white dark:bg-[#080808] h-[80%] w-[90%] flex justify-center items-center z-10">
          <div className="bg-[#D9D9D9] dark:bg-[#252D34] h-[90%] w-[90%] xl:w-[40%] xl:mr-[2rem] flex flex-col justify-around items-center">
            <div className="headerText rainbowText ">Mammocare AI Plus</div>
            <button
              onClick={() => {
                navigate(`/register-doctor`);
              }}
              className="primaryButton dark:primaryButtonDark px-[4rem] py-[1.5rem]"
            >
              For Doctor
            </button>
            <button
              onClick={() => {
                navigate(`/register-patient`);
              }}
              className="primaryButton dark:primaryButtonDark px-[4rem] py-[1.5rem]"
            >
              For Patient
            </button>
            <div className="primaryText dark:primaryTextDark">
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate(`/login`);
                }}
                className="text-[#0C4CDA] cursor-pointer hover:underline"
              >
                Login here
              </span>
            </div>
          </div>
          <div className="hidden xl:flex h-[90%] w-[40%] justify-center">
            <img src={SelectUserImg} alt="" className="h-[100%] w-auto" />
          </div>
        </div>
        <div className="gradCircle left-0"></div>
        <div className="gradCircle top-0"></div>
        <div className="gradCircle bottom-0"></div>
        <div className="gradCircle right-0"></div>
      </div>
    </>
  );
};

export default SelectUser;

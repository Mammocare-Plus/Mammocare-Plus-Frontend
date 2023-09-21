import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] mainContainer dark:mainContainerDark justify-center items-center relative overflow-hidden">
        <div className="headerText dark:headerTextDark text-center">
          Care For Your Skin Using <br /> The Power Of <br />
          <span className="rainbowText">Artificial Intelligence</span>
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/register-user`);
            }}
            className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
          >
            Get Started
          </button>
        </div>
        <div className="gradCircle -bottom-[20rem]"></div>
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const Inference = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-[1200px]:flex-row h-[100%] w-[100%] items-center mainContainer dark:mainContainerDark">
        {/* left container */}
        <div className="flex flex-col h-[100%] w-[100%] min-[1200px]:w-[60%] mainContainer dark:mainContainerDark justify-center items-center relative overflow-hidden">
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

        {/* right container */}
        <div className="flex flex-col h-[90%] w-[90%] min-[1200px]:w-[40%] my-[2rem] mx-[0rem] min-[1200px]:mx-[2rem] secondaryContainer dark:secondaryContainerDark border border-black dark:border-white">
          <div className="primaryText dark:primaryTextDark">
            Dermacare.ai is a powerful tool powered by Artificial Intelligence
            to accurately diagnose skin abnormalities.
          </div>
        </div>
      </div>
    </>
  );
};

export default Inference;

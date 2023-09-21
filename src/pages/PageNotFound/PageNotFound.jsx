import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-[100vh] mainContainer dark:mainContainerDark justify-center items-center relative overflow-hidden px-[1rem]">
        <div className="headerText rainbowText text-[10rem]">404</div>
        <div className="primaryText dark:primaryTextDark text-[2rem] text-center">
          The page you are looking for doesn't exist or has been recently moved
          :(
        </div>
        <div>
          <button
            onClick={() => {
              navigate(`/`);
            }}
            className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
          >
            Return Home?
          </button>
        </div>
        <div className="gradCircle -bottom-[20rem] -left-[10rem]"></div>
        <div className="gradCircle -top-[20rem] -right-[10rem]"></div>
      </div>
    </>
  );
};

export default PageNotFound;

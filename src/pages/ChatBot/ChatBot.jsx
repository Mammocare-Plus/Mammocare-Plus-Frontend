import React from "react";
import SelectUserImg from "../../assets/SelectUserImg.png";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../utils/config.js";

const ChatBot = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[100%] w-[100%] mainContainer dark:mainContainerDark">
        <div className="bg-white dark:bg-[#080808] h-[80%] w-[90%] flex flex-col min-[100px]:flex-row justify-center items-center gap-[1rem] z-10">
          <div className="plainContainer dark:plainContainerDark h-[90%] w-[90%] xl:w-[40%] xl:mr-[2rem] flex flex-col justify-center items-center gap-[2rem]">
            <div className="headerText rainbowText ">English ChatBot</div>
            <button
              onClick={() => {
                window.location.href = endpoints.englishChatBot;
              }}
              className="primaryButton dark:primaryButtonDark px-[4rem] py-[1.5rem]"
            >
              Click Here
            </button>
          </div>
          <div className="plainContainer dark:plainContainerDark h-[90%] w-[90%] xl:w-[40%] xl:mr-[2rem] flex flex-col justify-center items-center gap-[2rem]">
            <div className="headerText rainbowText ">हिन्दी चैटबॉट</div>
            <button
              onClick={() => {
                window.location.href = endpoints.hindiChatBot;
              }}
              className="primaryButton dark:primaryButtonDark px-[4rem] py-[1.5rem]"
            >
              यहाँ क्लिक करें
            </button>
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

export default ChatBot;

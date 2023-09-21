import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../utils/config";
import { Avatar } from "flowbite-react";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const InferenceDiagnosis = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const getData = async (query) => {
    let url = `${baseURL}/records/${id}`;
    if (query) {
      url = query;
    }
    const response = await fetch(url);

    console.log(response);
    const data = await response.json();

    setResult(data);
  };

  useEffect(() => {
    // getData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-col min-[1200px]:flex-row h-[100%] w-[100%] items-center mainContainer dark:mainContainerDark px-[0.5rem]">
        {/* left container */}
        <div className="flex flex-col h-[100%] w-[100%] min-[1200px]:w-[60%] mainContainer dark:mainContainerDark items-center relative overflow-hidden">
          <div className="headerText dark:headerTextDark mb-[1rem] mt-[4rem]">
            Your Diagnosis
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="gradCircle -bottom-[20rem]"></div>
        </div>

        {/* right container */}
        <div className="flex flex-col h-[90%] w-[90%] min-[1200px]:w-[40%] my-[2rem] mx-[0rem] min-[1200px]:mx-[2rem] secondaryContainer dark:secondaryContainerDark border border-black dark:border-white px-[2rem] py-[2rem] items-center">
          <div className="headerText dark:headerTextDark mb-[1rem] text-center">
            Nearest Doctor
          </div>

          <Avatar rounded size="xl" className="mb-[1rem]" />
          {/* <div className="bg-slate-600 w-[200px] h-[200px] rounded-full mb-[1rem]"></div> */}

          <div className="descriptionText dark:descriptionTextDark text-[30px] text-center mb-[1rem]">
            Dr. verylongname andsurname
          </div>

          <div className="descriptionText dark:descriptionTextDark text-center text-[20px] mb-[1rem]">
            MBBS, Dermatology, University of Medicine, Pune, India
          </div>

          <div className="descriptionText dark:descriptionTextDark text-[30px] text-center mb-[1rem]">
            Stars
          </div>

          <div className="descriptionText dark:descriptionTextDark text-[30px] text-center mb-[1rem]">
            Address of the doctor’s clinic
          </div>

          <div className="descriptionText dark:descriptionTextDark text-[30px] text-center mb-[1rem]">
            Charge per visit
          </div>

          <button
            onClick={() => {
              navigate(`/inference/diagnosis`);
            }}
            className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
          >
            Connect
          </button>
        </div>
      </div>
    </>
  );
};

export default InferenceDiagnosis;

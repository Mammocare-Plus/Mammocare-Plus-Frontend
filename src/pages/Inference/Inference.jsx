import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/config.js";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

const Inference = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    setUploaded(true);
    // clears the selected file(s) so that selecting the same files again still triggers the onChange
    // e.target.value = "";
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("bodyPart", selectedBodyPart);

    const url = `${baseURL}/inference`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const data = await response.json();

    const success = false;
    const id = 1;
    if (success) {
      navigate(`/inference/diagnosis/${id}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col min-[1200px]:flex-row h-[100%] w-[100%] items-center mainContainer dark:mainContainerDark">
        {/* left container */}
        <div className="flex flex-col h-[100%] w-[100%] min-[1200px]:w-[60%] mainContainer dark:mainContainerDark justify-center items-center relative overflow-hidden p-[1rem]">
          {!uploaded ? (
            <>
              <div className="headerText dark:headerTextDark text-center">
                Upload Image Of The Affected Area
              </div>
              <div className="z-10">
                <button
                  onClick={handleContainerClick}
                  className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
                >
                  Browse Device
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </>
          ) : (
            <>
              <div className="headerText dark:headerTextDark text-center">
                Uploaded Image
              </div>
              <div className="min-w-[300px] h-[300px] mt-[1rem] flex justify-center">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  className="h-full w-auto"
                />
              </div>
              <div className="mt-[1rem] z-10 flex flex-col">
                <label className="primaryText dark:primaryTextDark">
                  Select Localisation:
                </label>
                <select
                  id="bodyPartSelect"
                  value={selectedBodyPart}
                  onChange={(e) => {
                    setSelectedBodyPart(e.target.value);
                  }}
                >
                  <option value="">-- Select --</option>
                  <option value="Head">Face</option>
                  <option value="Shoulders">Neck</option>
                  <option value="Knees">Ears</option>
                  <option value="Toes">Scalp</option>
                  <option value="Toes">Arms</option>
                  <option value="Toes">Legs</option>
                  <option value="Toes">Groin</option>
                  <option value="Toes">Underarms</option>
                  {/* Add more body parts as needed */}
                </select>
              </div>
              <div className="flex flex-col min-[850px]:flex-row gap-[1rem]">
                <button
                  onClick={() => {
                    setUploaded(false);
                  }}
                  className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
                >
                  Change Photo
                </button>

                <button
                  onClick={handleUpload}
                  className="primaryButton dark:primaryButtonDark mt-8 px-[4rem] py-[1.5rem] relative z-10"
                >
                  Begin Diagnosis
                </button>
              </div>
            </>
          )}
          <div className="gradCircle -bottom-[20rem]"></div>
        </div>

        {/* right container */}
        <div className="flex flex-col h-[90%] w-[90%] min-[1200px]:w-[40%] my-[2rem] mx-[0rem] min-[1200px]:mx-[2rem] secondaryContainer dark:secondaryContainerDark border border-black dark:border-white px-[2rem] py-[2rem]">
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Dermacare.ai is a powerful tool powered by Artificial Intelligence
            to accurately diagnose skin abnormalities.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            To use dermacare.ai, upload an image, in clear light, focusing on
            the infected area you are concerned about.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Begin the diagnosis and wait for the AI to finish processing. Once
            finished, the AI will provide an estimate of what skin condition you
            might be affected with.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Please note that this is a primary diagnosis and patients should
            visit an expert for further guidance.
          </div>
        </div>
      </div>
    </>
  );
};

export default Inference;

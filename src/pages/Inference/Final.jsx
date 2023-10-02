import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { baseURL, endpoints } from "../../utils/config.js";
import { fastURL } from "../../utils/config.js";
import GradientCircle from "../../components/GradientCircle/GradientCircle";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "../../utils/init";
import AWS from "aws-sdk";

const S3_BUCKET_NAME = "musversebucket";
const REGION = "eu-north-1";

AWS.config.update({
  accessKeyId: "AKIA3JYGLGVUGOO6JKWV",
  secretAccessKey: "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",
  region: REGION,
});

const s3 = new AWS.S3();

const Inference = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  const [predictData, setPredictData] = useState();

  const [imageUrl, setImageUrl] = useState("");

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
    ``;
    setSelectedFile(e.target.files[0]);
    setUploaded(true);
    // clears the selected file(s) so that selecting the same files again still triggers the onChange
    // e.target.value = "";
  };

  const handleS3Upload = async () => {
    if (!selectedFile) return;
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: selectedFile.name,
      Body: selectedFile,
      ACL: "public-read", // Make the uploaded file publicly accessible
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error("Error uploading image:", err);
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // formData.append("bodyPart", selectedBodyPart);

      const url = endpoints.fastAPI;

      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      setLoading(false);

      const data = await response.json();
      console.log("response FAST", response);
      console.log("data FAST", data);

      const id = 1;
      if (response.status === 200) {
        setPredictData(data);

        const s3Data = await handleS3Upload();

        try {
          toast.success("Inference successful");
          const drfFormData = new FormData();
          drfFormData.append("prediction", data.prediction);
          drfFormData.append("uploadedImage", s3Data.Location);
          drfFormData.append("model", data.model_name);

          const drfUrl = endpoints.recordAfterInference;

          setLoading(true);
          const responseDrf = await fetch(drfUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
            },
            body: drfFormData,
          });
          setLoading(false);

          const dataDrf = await responseDrf.json();
          console.log("response DRF", responseDrf);
          console.log("data DRF", dataDrf);
          // call record api
          // navigate(`/inference/diagnosis/${id}`);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
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
                {/* {predictData && (
                  <div className="primaryText dark:primaryTextDark mb-[1rem]">
                    Prediction: {predictData.prediction}
                  </div>
                )} */}
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
              {/* <button
                onClick={() => {
                  handleS3Upload();
                }}
                className="primaryButton dark:primaryButtonDark text-[20px] mt-8 px-[1rem] py-[0.5rem]  relative z-10"
              >
                Test s3
              </button> */}
            </>
          )}
          <div className="gradCircle -bottom-[20rem]"></div>
        </div>

        {/* right container */}
        <div className="flex flex-col h-[90%] w-[90%] min-[1200px]:w-[40%] my-[2rem] mx-[0rem] min-[1200px]:mx-[2rem] secondaryContainer dark:secondaryContainerDark border border-black dark:border-white px-[2rem] py-[2rem]">
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Mammocare AI Plus is a powerful tool powered by Artificial Intelligence
            to accurately diagnose breast cancer.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            To use Mammocare AI Plus, upload a mammogram.
          </div>
          <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
            Begin the diagnosis and wait for the AI to finish processing. Once
            finished, the AI will provide a prediction.
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

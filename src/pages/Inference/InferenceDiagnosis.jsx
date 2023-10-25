import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../utils/config";
import { Avatar } from "flowbite-react";
import GradientCircle from "../../components/GradientCircle/GradientCircle";
import diseaseData from "../../utils/diseaseData";
import CampaignIcon from "@mui/icons-material/Campaign";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import sampleImg from "../../assets/sampleDisease.jpg";
import sampleImg from "../../assets/dr dhanjay.jpg";
import { endpoints } from "../../utils/config";

const InferenceDiagnosis = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [selectedDisease, setSelectedDisease] = useState("IDC (+)");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const getData = async (query) => {

    let url = endpoints.records + id;
    if (query) {
      url = query;
    }

    setLoading(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
      },
    });
    setLoading(false);

    console.log(response);
    const data = await response.json();

    setResult(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(null);
  const timeoutResumeInfinityRef = useRef(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synthRef.current = synth;
  }, []);

  const diseaseInfo = diseaseData[selectedDisease][selectedLanguage];
  const generalInfo = diseaseData?.general[selectedLanguage];

  const handleSpeech = () => {
    const synth = synthRef.current;

    const diseaseInfo = diseaseData[selectedDisease][selectedLanguage];
    const textToSpeech =
      diseaseInfo.description +
      " " +
      diseaseInfo.symptoms +
      " " +
      diseaseInfo.prescription;
    console.log(textToSpeech);

    // initializing text
    const utterance = new SpeechSynthesisUtterance(textToSpeech);

    // setting language
    utterance.lang = selectedLanguage;

    // setting voice based on language
    const voices = synth.getVoices();
    console.log(voices);

    let voice = null;
    if (selectedLanguage == "hi-IN") {
      voice = voices[9.5];
    }
    utterance.voice = voice;

    console.log(utterance);

    // Start a timer to keep speech synthesis active
    timeoutResumeInfinityRef.current = setInterval(() => {
      // console.log("running pause-resume loop");
      synth.pause();
      synth.resume();
    }, 5000); // Adjust the interval as needed to avoid sound artifacts

    // function called when speech ends
    utterance.onend = () => {
      clearInterval(timeoutResumeInfinityRef.current);
      setSpeaking(false);
    };

    synth.speak(utterance);

    setSpeaking(true);
  };

  const stopSpeech = () => {
    const synth = synthRef.current;

    // Clear the timer to stop refreshing
    clearInterval(timeoutResumeInfinityRef.current);

    // Cancel any ongoing speech synthesis
    if (synth.speaking) {
      synth.cancel();
    }

    // Set the speaking state to false when speech is stopped
    setSpeaking(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col min-[1200px]:flex-row h-[100%] w-[100%] items-center mainContainer dark:mainContainerDark px-[0.5rem]">
        {/* left container */}
        <div className="flex flex-col items-center h-[100%] w-[100%] min-[1200px]:w-[60%] mainContainer dark:mainContainerDark relative overflow-hidden">
          <div className="headerText dark:headerTextDark mb-[1rem] mt-[4rem]">
            Your Diagnosis
          </div>

          <div className="min-w-[200px] h-[200px] mt-[1rem] mb-[1rem] flex justify-center">
            <img src={result?.uploadedImage} className="h-full w-auto" />
          </div>

          <div className="w-[100%] flex items-center justify-between px-[1rem]">
            {speaking ? (
              <div onClick={stopSpeech} className="logoItem dark:logoItemDark">
                <VolumeOffIcon />
                <div>{generalInfo?.stop}</div>
              </div>
            ) : (
              <div
                onClick={handleSpeech}
                className="logoItem dark:logoItemDark"
              >
                <CampaignIcon />
                <div>{generalInfo?.speak}</div>
              </div>
            )}

            <div className="flex items-center gap-[1rem]">
              <label
                htmlFor="language"
                className="descriptionText dark:descriptionTextDark text-[16px]"
              >
                {generalInfo?.selectLang}:{" "}
              </label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                }}
                className="rounded-lg "
              >
                <option value="en-US">English</option>
                <option value="hi-IN">हिन्दी</option>
              </select>
            </div>
          </div>

          <DisplayInfo diseaseInfo={diseaseInfo} generalInfo={generalInfo} />
          {/* <div className="gradCircle -bottom-[20rem]"></div> */}
        </div>

        {/* right container */}
        <div className="flex flex-col h-[90%] w-[90%] min-[1200px]:w-[40%] my-[2rem] mx-[0rem] min-[1200px]:mx-[2rem] secondaryContainer dark:secondaryContainerDark border border-black dark:border-white px-[2rem] py-[2rem] items-center">
          <div className="headerText dark:headerTextDark mb-[1rem] text-center">
            Nearest Doctor
          </div>

          <Avatar rounded size="xl" className="mb-[1rem]" img={sampleImg}/>
          {/* <div className="bg-slate-600 w-[200px] h-[200px] rounded-full mb-[1rem]"></div> */}

          <div className="descriptionText dark:descriptionTextDark text-[25px] text-center mb-[1rem]">
            Dr. Dhanjay Deshmukhi
          </div>

          <div className="descriptionText dark:descriptionTextDark text-center text-[20px] mb-[1rem]">
            MD, Gynecologist
          </div>

          {/* <div className="descriptionText dark:descriptionTextDark text-[25px] text-center mb-[1rem]">
            Stars
          </div> */}

          <div className="descriptionText dark:descriptionTextDark text-[25px] text-center mb-[1rem]">
            Karvenagar, Pune
          </div>

          <div className="descriptionText dark:descriptionTextDark text-[25px] text-center mb-[1rem]">
            Consultation fee: Rs. 2500
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

const DisplayInfo = (props) => {
  const { diseaseInfo, generalInfo } = props;
  return (
    <>
      <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
        <span className="font-[800] text-[28px] underline">
          {generalInfo?.name}:
        </span>{" "}
        {diseaseInfo?.name}
      </div>
      <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
        <span className="font-[800] text-[28px] underline">
          {generalInfo?.description}:
        </span>{" "}
        {/* Eczema is a condition that causes your skin to become dry, itchy and
            bumpy. This condition weakens your skin’s barrier function, which is
            responsible for helping your skin retain moisture and protecting
            your body from outside elements. */}
        {diseaseInfo?.description}
      </div>
      <div className="descriptionText dark:descriptionTextDark text-[25px] mb-[2rem] text-center">
        <span className="font-[800] text-[28px] underline">
          {generalInfo?.symptoms}:
        </span>
        {/* Dry skin, Itchy skin, Skin rash, Bumps on your skin, Thick, leathery patches
        of skin, Flaky, scaly or crusty skin, Swelling. */}
        {diseaseInfo?.symptoms}
      </div>
    </>
  );
};

export default InferenceDiagnosis;

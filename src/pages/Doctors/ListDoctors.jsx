import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/config.js";
import prevButton from "../../assets/greater.svg";
import nextButton from "../../assets/lesser.svg";
import { Avatar } from "flowbite-react";

const ListDoctors = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async (query) => {
    let url = `${baseURL}/doctors`;
    if (query) {
      url = query;
    }
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    setState(data);
  };

  useEffect(() => {
    // getData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const url = `${baseURL}/doctors`;
    const finalUrl = `${url}/?=${searchQuery}`;
    // setLoader(false);
    await getData(finalUrl);
    // setLoader(true);
  };

  const nextPage = async () => {
    await getData(state?.next);
  };

  const previousPage = async () => {
    await getData(state?.previous);
  };

  const hasNextPage = state?.next !== null;
  const hasPreviousPage = state?.previous !== null;

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] mainContainer dark:mainContainerDark relative overflow-hidden">
        <div className="hidden min-[1000px]:flex mt-[1rem] px-[2rem] justify-between">
          <div className="rainbowContainer primaryText dark:primaryTextDark text-[25px] w-[18rem] h-[13rem] p-[1rem]">
            <div>Verified Doctors</div>
            <div className="mt-[2rem]">4000+</div>
          </div>
          <div className="rainbowContainer primaryText dark:primaryTextDark text-[25px] w-[18rem] h-[13rem] p-[1rem]">
            <div>Registered Patients</div>
            <div className="mt-[2rem]">10000+</div>
          </div>
          <div className="rainbowContainer primaryText dark:primaryTextDark text-[25px] w-[18rem] h-[13rem] p-[1rem]">
            <div>Specialists near you</div>
            <div className="mt-[2rem]">7</div>
          </div>
        </div>
        <div className="px-[2rem] mt-[2rem] flex flex-col min-[980px]:flex-row items-center justify-between">
          <div className="mb-[1rem] min-[980px]:mb-[0rem]">
            <div className="primaryText dark:primaryTextDark text-[30px]">
              Registered Doctors
            </div>
          </div>
          <div>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for doctors"
                className="rounded-lg w-[28rem]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button
                onClick={handleSearch}
                className="bareButton dark:bareButtonDark px-[1rem] py-[0.5rem] ml-[0.5rem]"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="plainContainer dark:plainContainerDark mt-[1rem] py-[1rem]">
          {/* dummy */}
          <div className="flex flex-col [&_*]:mt-[0.5rem] min-[850px]:[&_*]:mt-[0rem] min-[850px]:flex-row items-center justify-around mx-[2rem] py-[0.5rem] border-b-2 border-black dark:border-white">
            <div>
              <Avatar rounded />
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Dr. Rajesh Koothrapalli
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                MBBS, MD
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Kothrud, Pune
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate(`/doctors/view/1`);
                }}
                className="bareButton dark:bareButtonDark px-[1rem] py-[0.5rem] ml-[0.5rem] w-[6rem]"
              >
                View
              </button>
            </div>
          </div>
          <div className="flex flex-col [&_*]:mt-[0.5rem] min-[850px]:[&_*]:mt-[0rem] min-[850px]:flex-row items-center justify-around mx-[2rem] py-[0.5rem] border-b-2 border-black dark:border-white">
            <div>
              <Avatar rounded />
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Dr. Rajesh Koothrapalli
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                MBBS, MD
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Kothrud, Pune
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate(`/doctors/view/1`);
                }}
                className="bareButton dark:bareButtonDark px-[1rem] py-[0.5rem] ml-[0.5rem] w-[6rem]"
              >
                View
              </button>
            </div>
          </div>
          <div className="flex flex-col [&_*]:mt-[0.5rem] min-[850px]:[&_*]:mt-[0rem] min-[850px]:flex-row items-center justify-around mx-[2rem] py-[0.5rem] border-b-2 border-black dark:border-white">
            <div>
              <Avatar rounded />
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Dr. Rajesh Koothrapalli
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                MBBS, MD
              </div>
            </div>
            <div>
              <div className="primaryText dark:primaryTextDark text-[16px]">
                Kothrud, Pune
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate(`/doctors/view/1`);
                }}
                className="bareButton dark:bareButtonDark px-[1rem] py-[0.5rem] ml-[0.5rem] w-[6rem]"
              >
                View
              </button>
            </div>
          </div>
          {/* dummy end */}
        </div>

        {/* pagination */}
        <div className="flex justify-center my-[1rem]">
          <button onClick={previousPage} disabled={!hasPreviousPage}>
            <img src={prevButton} alt="" />
          </button>

          <div className="primaryText dark:primaryTextDark mx-[2rem]">
            <p>
              {state?.currentPage} of {state?.totalPages}
            </p>
          </div>

          <button onClick={nextPage} disabled={!hasNextPage}>
            <img src={nextButton} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListDoctors;

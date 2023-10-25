import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/config.js";
import prevButton from "../../assets/greater.svg";
import nextButton from "../../assets/lesser.svg";
import sampleImg from "../../assets/sampleDisease.jpg";
import formatDate from "../../utils/formatDate.js";


const ListRecords = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [diseases, setDisease] = useState([]);
  const [reportMap, setReportMap] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const baseURL = 'http://127.0.0.1:8000/api';

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecords(data);
      const predictionIDs = data.map((record) => record.prediction);
    console.log("predictionIDs", predictionIDs);
    const predictions = await Promise.all(
      predictionIDs.map(async (id) => {
        console.log("I am here");
        const res = await fetch(`${baseURL}/disease/${id}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
          }
        });
        const predResponse = await res.json();
        console.log("predResponse", predResponse);
        return predResponse['name'];
      })
    );
    console.log("predictions", predictions);
    setDisease(predictions);
      // console.log(data[0]);

      const recordPredMap = predictions.map((prediction, index) => {
        const currentRecord = data[index]['createdAt'];
        const currentImage = data[index]['uploadedImage']
        return { record: currentRecord, disease: prediction , image: currentImage };
      });
      console.log("recordPredMap", recordPredMap);
      setReportMap(recordPredMap);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `${baseURL}/record/`;
    fetchData(url);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const url = `${baseURL}/record/?search=${searchQuery}`;
    fetchData(url);
  };

  return (
    <>
      <div className="flex flex-col h-[100%] w-[100%] mainContainer dark:mainContainerDark relative overflow-hidden">
        {/* header */}
        <div className="px-[2rem] mt-[2rem] flex flex-col min-[980px]:flex-row items-center justify-between">
          <div className="mb-[1rem] min-[980px]:mb-[0rem]">
            <div className="primaryText dark:primaryTextDark text-[30px]">
              Your Inferences
            </div>
          </div>
          <div>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for records"
                className="rounded-lg w-[28rem]"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />

              <button
                onClick={handleSearch}
                className="utilButton dark:utilButtonDark  px-[1rem] py-[0.5rem] ml-[0.5rem]"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {
          reportMap.map((report, index) => {
            console.log(report.image);
            return (
              <div className="mt-[2rem]">
                <div className="flex flex-col min-[1110px]:flex-row justify-center px-[2rem] py-[2rem] border-b-2 border-black dark:border-white">
                  <div className="h-[15rem] flex justify-center mr-[2rem]">
                    <img src={report?.image} alt="image" className="h-[100%]" />
                  </div>

                  <div className="flex flex-col justify-center items-center py-[1rem]  ">
                    <div className="primaryText dark:primaryTextDark text-[22px] text-center">
                      Inferenced on: {formatDate(report.record)}
                    </div>
                    <div className="primaryText dark:primaryTextDark text-[22px] text-center mt-[2rem]">
                      AI Prediction: {report.disease}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        {/* pagination
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
        </div> */}
      </div>
    </>
  );

  // return (
  //   <div>
  //     <h1>List of Records</h1>

  //     <form onSubmit={handleSearch}>
  //       <input
  //         type="text"
  //         placeholder="Search records"
  //         value={searchQuery}
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //       />
  //       <button type="submit">Search</button>
  //     </form>

  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <ul>
  //         {records.map((record) => (
  //           <li key={record.id} style={
  //             {color: 'red'}
  //           }>
  //             {record.patient} -- {record.prediction}
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default ListRecords;




// const ListRecords = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [state, setState] = useState();
//   const [searchQuery, setSearchQuery] = useState("");

//   const getData = async (query) => {
//     let url = `${baseURL}/records`;
//     if (query) {
//       url = query;
//     }
//     const response = await fetch(url);
//     console.log(response);
//     const data = await response.json();
//     setState(data);
//   };

//   useEffect(() => {
//     // getData();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     const url = `${baseURL}/records`;
//     const finalUrl = `${url}/?=${searchQuery}`;
//     // setLoader(false);
//     await getData(finalUrl);
//     // setLoader(true);
//   };

//   const nextPage = async () => {
//     await getData(state?.next);
//   };

//   const previousPage = async () => {
//     await getData(state?.previous);
//   };

//   const hasNextPage = state?.next !== null;
//   const hasPreviousPage = state?.previous !== null;

//   if (loading) {
//     return <Loader />;
//   }
// };

// export default ListRecords;

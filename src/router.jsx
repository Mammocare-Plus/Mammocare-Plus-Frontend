import { createBrowserRouter } from "react-router-dom";
import { applyTheme } from "./utils/applyTheme";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";

import RegisterUser from "./pages/Register/RegisterUser/RegisterUser";
import SelectUser from "./pages/SelectUser/SelectUser";
import RegisterPatient from "./pages/Register/RegisterPatient/RegisterPatient";

import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import Inference from "./pages/Inference/Inference";
import InferenceDiagnosis from "./pages/Inference/InferenceDiagnosis";
import SpeechTest from "./pages/Inference/SpeechTest";

import ListRecords from "./pages/Records/ListRecords";
import ViewRecords from "./pages/Records/ViewRecords";

import PatientProfile from "./pages/Profile/PatientProfile";
import EditPatient from "./pages/Profile/EditProfile/EditPatient";

import Inbox from "./pages/Inbox/Inbox";
import Chat from "./pages/Inbox/Chat/Chat";

import ChatBot from "./pages/ChatBot/ChatBot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home
      {
        index: true,
        element: <Home />,
      },

      // Auth
      {
        path: "select-user",
        element: <SelectUser />,
      },
      {
        path: "register-user",
        element: <RegisterUser />,
      },
      {
        path: "register-patient",
        element: <RegisterPatient />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // Inference
      {
        path: "inference",
        element: <Inference />,
      },
      {
        path: "inference/diagnosis/:id",
        element: <InferenceDiagnosis />,
      },
      // {
      //   path: "speech/:id",
      //   element: <SpeechTest />,
      // },

      // Records
      {
        path: "records",
        element: <ListRecords />,
      },
      {
        path: "records/view/:id",
        element: <ViewRecords />,
      },

      // Profiles
      {
        path: "profile/patient",
        element: <PatientProfile />,
      },
      {
        path: "profile/patient/edit",
        element: <EditPatient />,
      },

      // Inbox
      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "inbox/chat/:id",
        element: <Chat />,
      },

      // Chatbot
      {
        path: "chatbot",
        element: <ChatBot />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

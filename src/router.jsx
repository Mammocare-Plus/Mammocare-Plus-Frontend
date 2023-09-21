import { createBrowserRouter } from "react-router-dom";
import { applyTheme } from "./utils/applyTheme";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./pages/Home/Home";

import RegisterUser from "./pages/Register/RegisterUser/RegisterUser";
import SelectUser from "./pages/SelectUser/SelectUser";
import RegisterPatient from "./pages/Register/RegisterPatient/RegisterPatient";
import RegisterDoctor from "./pages/Register/RegisterDoctor/RegisterDoctor";

import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import Inference from "./pages/Inference/Inference";
import InferenceDiagnosis from "./pages/Inference/InferenceDiagnosis";

import ListDoctors from "./pages/Doctors/ListDoctors";
import ViewDoctors from "./pages/Doctors/ViewDoctors";

import ListRecords from "./pages/Records/ListRecords";
import ViewRecords from "./pages/Records/ViewRecords";

import PatientProfile from "./pages/Profile/PatientProfile";
import DoctorProfile from "./pages/Profile/DoctorProfile";
import EditPatient from "./pages/Profile/EditProfile/EditPatient";
import EditDoctor from "./pages/Profile/EditProfile/EditDoctor";

import Inbox from "./pages/Inbox/Inbox";
import Chat from "./pages/Inbox/Chat/Chat";

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
        path: "register-doctor",
        element: <RegisterDoctor />,
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

      // Records
      {
        path: "records",
        element: <ListRecords />,
      },
      {
        path: "records/view/:id",
        element: <ViewRecords />,
      },

      // Doctors
      {
        path: "doctors",
        element: <ListDoctors />,
      },
      {
        path: "doctors/view/:id",
        element: <ViewDoctors />,
      },

      // Profiles
      {
        path: "profile/doctor",
        element: <DoctorProfile />,
      },
      {
        path: "profile/patient",
        element: <PatientProfile />,
      },
      {
        path: "profile/doctor/edit",
        element: <EditDoctor />,
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
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

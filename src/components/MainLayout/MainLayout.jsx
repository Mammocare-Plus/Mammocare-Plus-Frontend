import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { applyTheme } from "../../utils/applyTheme";
import { NavLink } from "react-router-dom";
import dermaLogo from "../../assets/logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToggleSwitch } from "flowbite-react";

import { Avatar } from "flowbite-react";
import defaultPfp from "../../assets/defaultPfp.jpg";
import TextsmsIcon from "@mui/icons-material/Textsms";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const checkUser = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const darkModeToggle = () => {
    const theme = localStorage.getItem("theme");
    if (!theme || theme === "light") {
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
      applyTheme();
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
      applyTheme();
    }
  };

  return (
    <>
      <div className="min-h-[100vh] flex ">
        {/* Left Nav */}
        <div className=" relative w-[80px]">
          <div
            className={`${
              isExpanded ? "w-[300px] px-[1rem]" : "w-[80px] items-center"
            } fixed navContainer dark:navContainerDark min-h-[100%] flex flex-col justify-between py-[1rem] z-40`}
            onMouseEnter={toggleMenu}
            onMouseLeave={toggleMenu}
          >
            {isExpanded ? (
              <>
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={dermaLogo}
                      alt="logo"
                      className="bg-[#2196F3] w-[40px] h-[40px] p-[4px]"
                    />
                    <div className="logoText dark:logoTextDark">
                      dermacare.ai
                    </div>
                  </div>

                  {/* Nav Items */}
                  <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem] mt-[3rem]"
                        : "navItem dark:navItemDark ml-[0.5rem] mt-[3rem]"
                    }
                  >
                    <HomeIcon />
                    <div>Home</div>
                  </NavLink>
                  <NavLink
                    to={`/inference`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem dark:navItemDark ml-[0.5rem]"
                    }
                  >
                    <NoteAltIcon />
                    <div>DermacareAI</div>
                  </NavLink>
                  <NavLink
                    to={`/records`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem dark:navItemDark ml-[0.5rem]"
                    }
                  >
                    <DescriptionIcon />
                    <div>Records</div>
                  </NavLink>
                  <NavLink
                    to={`/doctors`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem] p-[2px]"
                        : "navItem dark:navItemDark ml-[0.5rem] p-[2px]"
                    }
                  >
                    <GroupsIcon />
                    <div>Doctors</div>
                  </NavLink>
                </div>

                {/* Nav Footer */}
                <div>
                  <div className="darkModeContainer dark:darkModeContainerDark">
                    <DarkModeIcon />
                    {/* <div>Dark Mode</div> */}
                    <ToggleSwitch
                      checked={isDarkMode}
                      onChange={darkModeToggle}
                    />
                  </div>
                  <div className="logoutContainer dark:logoutContainerDark">
                    <LogoutIcon />
                    <div>Logout</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <img
                      src={dermaLogo}
                      alt="logo"
                      className="bg-[#2196F3] w-[40px] h-[40px] p-[4px]"
                    />
                  </div>

                  {/* Nav Items */}
                  <NavLink
                    to={`/`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit mt-[3rem]"
                        : "navItem dark:navItemDark mt-[3rem]"
                    }
                  >
                    <HomeIcon />
                  </NavLink>
                  <NavLink
                    to={`/inference`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem dark:navItemDark"
                    }
                  >
                    <NoteAltIcon />
                  </NavLink>
                  <NavLink
                    to={`/records`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem dark:navItemDark"
                    }
                  >
                    <DescriptionIcon />
                  </NavLink>
                  <NavLink
                    to={`/doctors`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit p-[2px]"
                        : "navItem dark:navItemDark p-[2px]"
                    }
                  >
                    <GroupsIcon />
                  </NavLink>
                </div>

                {/* Nav Footer */}
                <div>
                  <div
                    onClick={darkModeToggle}
                    className="darkModeContainer dark:darkModeContainerDark"
                  >
                    <DarkModeIcon />
                  </div>
                  <div className="logoutContainer dark:logoutContainerDark">
                    <LogoutIcon />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Container */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-[4rem] flex">
            <div className="fixed h-[4rem] w-[100%] pr-[80px] headerContainer dark:headerContainerDark py-[1rem] flex justify-end gap-[1rem] items-center z-30">
              <TextsmsIcon
                className="text-[#5FB3F6] cursor-pointer"
                style={{ fontSize: "2rem" }}
              />
              <Avatar
                img={defaultPfp}
                alt="default pfp"
                rounded
                className="cursor-pointer pr-[2rem]"
              />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

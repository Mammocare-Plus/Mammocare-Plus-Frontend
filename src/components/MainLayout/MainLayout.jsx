import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { applyTheme } from "../../utils/applyTheme";
import { NavLink } from "react-router-dom";
import mammoLogo from "../../assets/logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToggleSwitch } from "flowbite-react";
import TextsmsIcon from "@mui/icons-material/Textsms";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

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
                      src={mammoLogo}
                      alt="logo"
                      className="bg-[#2196F3] w-[40px] h-[40px] p-[4px]"
                    />
                    <div className="logoText dark:logoTextDark">Mammocare+</div>
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
                    <div>Inference</div>
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
                    to={`/chatbot`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive ml-[0.5rem]"
                        : "navItem dark:navItemDark ml-[0.5rem]"
                    }
                  >
                    <TextsmsIcon
                      className="text-[#5FB3F6] cursor-pointer"
                      style={{ fontSize: "2rem" }}
                    />
                    <div>Chat</div>
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
                  <div
                    className="logoutContainer dark:logoutContainerDark"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
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
                      src={mammoLogo}
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
                    to={`/chatbot`}
                    className={({ isActive }) =>
                      isActive
                        ? "navItemActive w-fit"
                        : "navItem dark:navItemDark"
                    }
                  >
                    <TextsmsIcon
                      className="text-[#5FB3F6] cursor-pointer"
                      style={{ fontSize: "2rem" }}
                    />
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
          {/* Main */}
          <div className="flex-1 mainContainer dark:mainContainerDark">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

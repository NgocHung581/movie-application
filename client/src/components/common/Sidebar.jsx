import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import menuConfigs from "../../configs/menu.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";

function Sidebar() {
    const titleClass = "uppercase text-xl font-medium mb-5";
    const menuItemClass = (isActive = false) =>
        `flex items-center gap-8 my-2 p-3 rounded-lg dark:text-white text-black text-base uppercase ${
            isActive ? "bg-primary" : ""
        }`;

    const dispatch = useDispatch();

    const { themeMode } = useSelector((state) => state.themeMode);

    const [isOpen, setIsOpen] = useState(false);

    const closeSidebar = () => setIsOpen(false);

    const toggleDarkMode = () => {
        const theme = themeMode === "dark" ? "light" : "dark";
        dispatch(setThemeMode(theme));
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <Bars3Icon className="h-6 w-6" onClick={() => setIsOpen(true)} />
            {isOpen && (
                <div className="fixed top-0 left-0 bottom-0 right-0">
                    <div
                        className="bg-overlay h-full w-full"
                        onClick={closeSidebar}
                    ></div>
                    <div className="absolute top-0 left-0 w-[300px]  h-full dark:bg-[#363636] bg-white">
                        <div className="px-6 py-5 text-center">
                            <Logo />
                        </div>
                        <div className="px-[30px] py-2">
                            <h6 className={titleClass}>Menu</h6>
                            <ul>
                                {menuConfigs.main.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        onClick={closeSidebar}
                                    >
                                        {({ isActive }) => (
                                            <li
                                                className={menuItemClass(
                                                    isActive
                                                )}
                                            >
                                                <span>{item.icon}</span>
                                                <span>{item.display}</span>
                                            </li>
                                        )}
                                    </NavLink>
                                ))}
                            </ul>
                            <h6 className={titleClass}>Personal</h6>
                            <ul>
                                {menuConfigs.user.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        onClick={closeSidebar}
                                    >
                                        {({ isActive }) => (
                                            <li
                                                className={menuItemClass(
                                                    isActive
                                                )}
                                            >
                                                <span>{item.icon}</span>
                                                <span>{item.display}</span>
                                            </li>
                                        )}
                                    </NavLink>
                                ))}
                            </ul>
                            <h6 className={titleClass}>Theme</h6>
                            <div
                                className={menuItemClass()}
                                onClick={toggleDarkMode}
                            >
                                {themeMode === "dark" ? (
                                    <MoonIcon className="w-6 h-6 stroke-[2px]" />
                                ) : (
                                    <SunIcon className="w-6 h-6 stroke-[2px]" />
                                )}
                                <span>Dark Mode</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { routesGen } from "../../routes/routes";
import Button from "./Button";
import Logo from "./Logo";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

function Header() {
    const dispatch = useDispatch();
    const { themeMode } = useSelector((state) => state.themeMode);
    const { user } = useSelector((state) => state.user);
    const [isScroll, setIsScroll] = useState(false);

    const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });

    const toggleDarkMode = () => {
        const theme = themeMode === "dark" ? "light" : "dark";
        dispatch(setThemeMode(theme));
    };

    useEffect(() => {
        const handleHeaderOnScroll = () => {
            if (window.scrollY > 0) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener("scroll", handleHeaderOnScroll);

        return () => window.removeEventListener("scroll", handleHeaderOnScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between transition-300 ${
                isScroll ? "dark:bg-dark" : "dark:bg-transparent"
            } bg-white`}
        >
            <div className="flex items-center gap-8 flex-grow">
                {/* SIDEBAR ON MOBILE AND TABLET */}
                {isTabletOrMobile && <Sidebar />}
                {/* SIDEBAR ON MOBILE AND TABLET */}

                <Link to={routesGen.home}>
                    <Logo />
                </Link>

                {!isTabletOrMobile && (
                    <>
                        <Navbar />
                        <Button
                            className="cursor-pointer p-2 rounded-full hover:bg-[#ffffff14] transition-300"
                            onClick={toggleDarkMode}
                        >
                            {themeMode === "dark" ? (
                                <MoonIcon className="w-6 h-6 stroke-[2px]" />
                            ) : (
                                <SunIcon className="w-6 h-6 stroke-[2px]" />
                            )}
                        </Button>
                    </>
                )}
            </div>

            {user ? (
                <UserMenu user={user} />
            ) : (
                <Button
                    primary
                    onClick={() => dispatch(setAuthModalOpen(true))}
                >
                    Sign in
                </Button>
            )}
        </header>
    );
}

export default Header;

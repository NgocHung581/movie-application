import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Logo from "./Logo";

function GlobalLoading() {
    const { globalLoading } = useSelector((state) => state.globalLoading);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (globalLoading) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [globalLoading]);

    return (
        <div
            className={`fixed z-50 w-screen h-screen transition-300 pointer-events-none dark:bg-dark bg-white bg-loading ${
                isLoading ? "opacity-100" : "opacity-0"
            }`}
        >
            <div className="h-1 absolute top-16 left-0 right-0 dark:bg-[#7f0000] bg-[#ff9e9e]">
                <span className="inline-block bg-primary w-1/2 h-full absolute top-0 left-0 animate-loading-slide"></span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Logo />
            </div>
        </div>
    );
}

export default GlobalLoading;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import PageWrapper from "./components/common/PageWrapper";
import ScrollToTop from "./components/common/ScrollToTop";
import MainLayout from "./components/layout/MainLayout";
import routes, { routesGen } from "./routes/routes";

function App() {
    const { themeMode } = useSelector((state) => state.themeMode);

    useEffect(() => {
        switch (themeMode) {
            case "dark":
                document.documentElement.classList.add("dark");
                return;
            case "light":
                document.documentElement.classList.remove("dark");
                return;
            default:
                document.documentElement.classList.add("dark");
                return;
        }
    }, [themeMode]);

    return (
        <div className="app bg-white text-black dark:bg-black dark:text-white transition-300">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme={themeMode}
            />

            {/* APP ROUTES */}
            <Router>
                <ScrollToTop />

                <Routes>
                    <Route path={routesGen.home} element={<MainLayout />}>
                        {routes.map((route, index) =>
                            route.index ? (
                                <Route
                                    key={index}
                                    index
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            )
                        )}
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

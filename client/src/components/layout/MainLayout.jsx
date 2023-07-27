import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Header from "../common/Header";
import AuthModal from "../common/AuthModal";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";

function MainLayout() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const authUser = async () => {
            const { res, error } = await userApi.getInfo();

            if (res) dispatch(setUser(res));

            if (error) dispatch(setUser(null));
        };

        authUser();
    }, [dispatch]);

    useEffect(() => {
        const getFavorites = async () => {
            const { res, error } = await favoriteApi.getList();

            if (res) dispatch(setListFavorites(res));

            if (error) toast.error(error.message);
        };

        if (user) {
            getFavorites();
        } else {
            dispatch(setListFavorites([]));
        }
    }, [user, dispatch]);

    return (
        <>
            {/* GLOBAL LOADING */}
            <GlobalLoading />

            {/* LOGIN MODAL */}
            <AuthModal />

            <div className="min-h-screen flex flex-col">
                {/* HEADER */}
                <Header />

                {/* MAIN */}
                <main className="pb-20 overflow-hidden min-h-screen flex-grow dark:bg-black bg-light transition-300">
                    <Outlet />
                </main>

                {/* FOOTER */}
                <Footer />
            </div>
        </>
    );
}

export default MainLayout;

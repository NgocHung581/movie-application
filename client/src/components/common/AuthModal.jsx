import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const actionState = {
    signIn: "signIn",
    signUp: "signUp",
};

function AuthModal() {
    const dispatch = useDispatch();
    const { authModalOpen } = useSelector((state) => state.authModal);

    const [action, setAction] = useState(actionState.signIn);

    const handleClose = () => dispatch(setAuthModalOpen(false));

    useEffect(() => {
        if (authModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [authModalOpen]);

    useEffect(() => {
        if (authModalOpen) {
            setAction(actionState.signIn);
        }
    }, [authModalOpen]);

    if (!authModalOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[90] h-screen w-screen">
            <div
                className="bg-overlay h-full w-full"
                onClick={handleClose}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 dark:bg-dark bg-light rounded p-8 text-center box-shadow-auth-modal min-w-[540px]">
                <div className="mb-8">
                    <Logo />
                </div>
                {action === actionState.signIn && (
                    <LoginForm
                        switchStateAction={() => setAction(actionState.signUp)}
                    />
                )}
                {action === actionState.signUp && (
                    <RegisterForm
                        switchStateAction={() => setAction(actionState.signIn)}
                    />
                )}
            </div>
        </div>
    );
}

export default AuthModal;

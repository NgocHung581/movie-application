import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import TippyHeadless from "@tippyjs/react/headless";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import Button from "./Button";

function UserMenu({ user }) {
    const itemClass =
        "hover:dark:bg-[#ffffff14] cursor-pointer transition-300 uppercase leading-8";
    const itemLinkClass = "flex items-center justify-between px-4 py-2";
    const itemIconClass = "min-w-[56px]";
    const itemLabelClass = "flex-1 whitespace-nowrap";

    const dispatch = useDispatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        dispatch(setUser(null));
        toast.success("Sign Out Successfully");
    };

    return (
        <div>
            <TippyHeadless
                interactive
                visible={isMenuOpen}
                onClickOutside={() => setIsMenuOpen(false)}
                placement="bottom-end"
                offset={[0, 20]}
                render={(attrs) => (
                    <div
                        className="dark:bg-dark bg-white box-shadow-user-menu bg-image-user-menu rounded relative"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <div className="absolute top-0 right-6 -translate-y-full border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] dark:border-b-[#303030] border-b-white"></div>
                        <ul className="py-2">
                            {menuConfigs.user.map((item, index) => {
                                return (
                                    <li key={index} className={itemClass}>
                                        <Link
                                            to={item.path}
                                            className={itemLinkClass}
                                        >
                                            <div className={itemIconClass}>
                                                {item.icon}
                                            </div>
                                            <span className={itemLabelClass}>
                                                {item.display}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className={itemClass}>
                                <Button
                                    className={`${itemLinkClass}`}
                                    onClick={handleSignOut}
                                >
                                    <div className={itemIconClass}>
                                        <ArrowRightOnRectangleIcon className="w-6 h-6" />
                                    </div>
                                    <span
                                        className={`${itemLabelClass} text-base font-normal leading-8`}
                                    >
                                        Sign out
                                    </span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <span
                    className="cursor-pointer text-xl font-medium"
                    onClick={() => setIsMenuOpen(true)}
                >
                    {user.displayName}
                </span>
            </TippyHeadless>
        </div>
    );
}
UserMenu.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserMenu;

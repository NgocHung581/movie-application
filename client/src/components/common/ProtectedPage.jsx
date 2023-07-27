import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

function ProtectedPage({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setAuthModalOpen(!user));
    }, [user, dispatch]);

    return user ? children : null;
}

ProtectedPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedPage;

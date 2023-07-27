import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAppState } from "../../redux/features/appStateSlice";

function PageWrapper({ state, children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
        dispatch(setAppState(state));
    }, [state, dispatch]);

    return children;
}

export default PageWrapper;

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

function Alert({ message }) {
    return (
        <div className="flex items-center gap-3 text-[rgb(244,199,199)] px-4 py-1.5 border border-[#e57373] rounded mt-4">
            <ExclamationCircleIcon className="w-6 h-6 text-secondary" />
            <span className="text-sm py-2">{message}</span>
        </div>
    );
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Alert;

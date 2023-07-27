import PropTypes from "prop-types";

function Spinner({ sm }) {
    return (
        <div
            className={`${
                sm ? "w-6 h-6" : "w-7 h-7"
            } relative spinner-before spinner-after`}
        ></div>
    );
}

Spinner.propTypes = {
    sm: PropTypes.bool,
};

export default Spinner;

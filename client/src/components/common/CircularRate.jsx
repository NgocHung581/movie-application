import PropTypes from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularRate({ value = 0, className = "", textColor = "" }) {
    return (
        <CircularProgressbar
            value={value * 10}
            text={Math.floor(value * 10) / 10}
            className={`h-[50px] w-[50px] ${className}`}
            styles={buildStyles({
                textColor,
                pathColor: "#66bb6a",
                trailColor: "transparent",
            })}
        />
    );
}

CircularRate.propTypes = {
    value: PropTypes.number.isRequired,
    className: PropTypes.string,
    textColor: PropTypes.string,
};

export default CircularRate;

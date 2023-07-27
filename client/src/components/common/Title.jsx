import PropTypes from "prop-types";

function Title({ title }) {
    return (
        <h5 className="mb-8 text-2xl font-bold uppercase relative before:content-[''] before:h-[5px] before:w-[100px] before:bg-primary before:absolute before:bottom-0 before:left-0 before:translate-y-full">
            {title}
        </h5>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;

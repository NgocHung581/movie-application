import PropTypes from "prop-types";

function TextAvatar({ text }) {
    const stringToColor = (str) => {
        let hash = 0;
        let i;

        for (i = 0; i < str.length; i += 1) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    };

    return (
        <div
            style={{ "--random-color": stringToColor(text) }}
            className="flex items-center justify-center rounded-full h-10 w-10 bg-[var(--random-color)] dark:text-black text-white transition-300"
        >
            {text.split(" ")[0][0]}
        </div>
    );
}

TextAvatar.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TextAvatar;

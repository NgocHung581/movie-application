import PropTypes from "prop-types";

import tmdbConfigs from "../../api/configs/tmdb.configs";

function ImageHeader({ imgPath }) {
    return (
        <div
            style={{
                "--image-url": `url(${tmdbConfigs.backdropPath(imgPath)})`,
            }}
            className="relative pt-[40%] md:pt-[35%] bg-top bg-cover bg-fixed bg-[image:var(--image-url)] before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-full before:pointer-events-none dark:before:gradient-bg-image-dark before:gradient-bg-image-light"
        ></div>
    );
}

ImageHeader.propTypes = {
    imgPath: PropTypes.string.isRequired,
};

export default ImageHeader;

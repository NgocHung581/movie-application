import PropTypes from "prop-types";

import MediaItem from "./MediaItem";

function MediaGrid({ medias, mediaType }) {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {medias.map((media) => (
                <MediaItem key={media.id} media={media} mediaType={mediaType} />
            ))}
        </div>
    );
}

MediaGrid.propTypes = {
    medias: PropTypes.array.isRequired,
    mediaType: PropTypes.string.isRequired,
};

export default MediaGrid;

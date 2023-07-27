import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import personApi from "../../api/modules/person.api";
import Button from "./Button";
import MediaItem from "./MediaItem";

function PersonMediaGrid({ personId }) {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const skip = 8;

    const getReleaseDate = (media) => {
        const date =
            media.media_type === tmdbConfigs.mediaType.movie
                ? new Date(media.release_date)
                : new Date(media.first_air_date);
        return date.getTime();
    };

    const onLoadMore = () => {
        setFilteredMedias([
            ...filteredMedias,
            ...[...medias].splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    useEffect(() => {
        const getMedias = async () => {
            const { res, error } = await personApi.medias({ personId });

            if (error) toast.error(error.message);
            if (res) {
                const mediaSorted = res.cast.sort(
                    (a, b) => getReleaseDate(b) - getReleaseDate(a)
                );
                setMedias(mediaSorted);
                setFilteredMedias(mediaSorted.splice(0, skip));
            }
        };

        getMedias();
    }, [personId]);

    return (
        <>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {filteredMedias.map((media) => (
                    <MediaItem
                        key={media.id}
                        media={media}
                        mediaType={media.media_type}
                    />
                ))}
            </div>
            {filteredMedias.length < medias.length && (
                <Button
                    text
                    onClick={onLoadMore}
                    className="w-full mt-8 dark:text-primary text-primary"
                >
                    Load More
                </Button>
            )}
        </>
    );
}

PersonMediaGrid.propTypes = {
    personId: PropTypes.string.isRequired,
};

export default PersonMediaGrid;

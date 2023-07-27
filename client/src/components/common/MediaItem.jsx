import { HeartIcon, PlayIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import { routesGen } from "../../routes/routes";
import favoriteUtils from "../../utils/favorite.utils";
import Button from "../common/Button";
import CircularRate from "../common/CircularRate";

function MediaItem({ media, mediaType }) {
    const { listFavorites } = useSelector((state) => state.user);

    const isTabletOrMobile = useMediaQuery({ maxWidth: 1023 });

    return (
        <Link
            to={
                mediaType !== "people"
                    ? routesGen.mediaDetail(
                          mediaType,
                          media.id || media.mediaId
                      )
                    : routesGen.person(media.id)
            }
        >
            <div
                style={{
                    "--image-url": `url(${tmdbConfigs.backdropPath(
                        media.poster_path ||
                            media.backdrop_path ||
                            media.mediaPoster ||
                            media.profile_path
                    )})`,
                }}
                className="group bg-[image:var(--image-url)] bg-[#a9a9a9] bg-cover bg-center pt-[150%] relative text-white overflow-hidden"
            >
                {/* MOVIE OR TV ITEM */}
                {mediaType !== "people" && (
                    <>
                        {favoriteUtils.check({
                            listFavorites,
                            mediaId: media.id,
                        }) && (
                            <HeartIcon className="h-8 w-8 absolute top-4 right-4 text-primary" />
                        )}
                        <div className="h-full w-full absolute top-0 left-0 card-overlay lg:opacity-0 lg:group-hover:opacity-100 transition-300"></div>
                        {!isTabletOrMobile && (
                            <Button
                                lg
                                primary
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-300"
                            >
                                <PlayIcon className="h-4 w-4" />
                            </Button>
                        )}
                        <div className="h-max w-full absolute bottom-0 left-0 lg:translate-y-full lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 px-4 py-8 transition-300">
                            {(media.vote_average || media.mediaRate) && (
                                <CircularRate
                                    value={
                                        media.vote_average || media.mediaRate
                                    }
                                    textColor="#fff"
                                />
                            )}
                            <p className="mt-4">
                                {media?.release_date?.split("-")[0] ||
                                    media?.first_air_date?.split("-")[0]}
                            </p>
                            <p className="line-clamp-1 font-bold mt-4">
                                {media.title || media.name || media.mediaTitle}
                            </p>
                        </div>
                    </>
                )}

                {/* PEOPLE */}
                {mediaType === "people" && (
                    <div className="absolute w-full h-max bottom-0 p-2.5 bg-[rgba(0,0,0,0.6)]">
                        <p className="line-clamp-1">{media.name}</p>
                    </div>
                )}
            </div>
        </Link>
    );
}

MediaItem.propTypes = {
    media: PropTypes.object.isRequired,
    mediaType: PropTypes.string.isRequired,
};

export default MediaItem;

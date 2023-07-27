import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartIconSolid,
    PlayIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import tmdbConfigs from "../api/configs/tmdb.configs";
import favoriteApi from "../api/modules/favorite.api";
import mediaApi from "../api/modules/media.api";
import Button from "../components/common/Button";
import CastSlide from "../components/common/CastSlide";
import CircularRate from "../components/common/CircularRate";
import ImageHeader from "../components/common/ImageHeader";
import Spinner from "../components/common/Spinner";
import Title from "../components/common/Title";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import MediaReview from "../components/common/MediaReview";

function MediaDetail() {
    const { mediaType, mediaId } = useParams();

    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [genres, setGenres] = useState([]);
    const [onRequest, setOnRequest] = useState(false);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const onFavoriteClick = async () => {
        if (onRequest) return;

        if (!user) return dispatch(setAuthModalOpen(true));

        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        setOnRequest(true);

        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average,
        };

        const { res, error } = await favoriteApi.add(body);

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            dispatch(addFavorite(res));
            setIsFavorite(true);
            toast.success("Add Favorite Successfully");
        }
    };

    const onRemoveFavorite = async () => {
        setOnRequest(true);

        const favorite = listFavorites.find(
            (item) => item.mediaId.toString() === mediaId.toString()
        );

        const { res, error } = await favoriteApi.remove({
            favoriteId: favorite.id,
        });

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            dispatch(removeFavorite(favorite));
            setIsFavorite(false);
            toast.success("Remove Favorite Successfully");
        }
    };

    useEffect(() => {
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { res, error } = await mediaApi.getDetail({
                mediaType,
                mediaId,
            });
            dispatch(setGlobalLoading(false));

            if (res) {
                setMedia(res);
                setIsFavorite(res.isFavorite);
                setGenres(res.genres);
            }

            if (error) toast.error(error.message);
        };

        getMedia();
    }, [mediaType, mediaId, dispatch]);

    if (!media) return null;

    return (
        <>
            <ImageHeader imgPath={media.backdrop_path || media.poster_path} />
            <div className="container mx-auto z-10 relative">
                {/* MEDIA CONTENT */}
                <div className="-mt-2.5 md:-mt-60 lg:-mt-80 mb-20">
                    <div className="flex flex-col md:flex-row">
                        {/* POSTER */}
                        <div className="w-1/2 md:w-2/5 mb-8 md:mb-0 mx-auto md:mx-0 md:mr-8">
                            <div
                                style={{
                                    "--image-url": `url(${tmdbConfigs.posterPath(
                                        media.poster_path || media.backdrop_path
                                    )})`,
                                }}
                                className="pt-[140%] bg-[image:var(--image-url)] bg-cover bg-center"
                            ></div>
                        </div>

                        {/* MEDIA INFO */}
                        <div className="w-full md:w-3/5">
                            <h4 className="text-3xl lg:text-6xl font-bold line-clamp-2 tracking-wide lg:leading-normal">
                                {media.title || media.name}{" "}
                                {mediaType === tmdbConfigs.mediaType.movie
                                    ? media.release_date.split("-")[0]
                                    : media.first_air_date.split("-")[0]}
                            </h4>

                            <div className="flex items-center gap-4 mt-10">
                                <CircularRate value={media.vote_average} />
                                <ul className="flex items-center gap-2">
                                    {genres.map((genre) => (
                                        <li
                                            key={genre.id}
                                            className="bg-primary rounded-full text-sm leading-8 px-3 text-white"
                                        >
                                            {genre.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-10 line-clamp-5 text-justify tracking-wide">
                                {media.overview}
                            </p>

                            <div className="flex items-center gap-4 mt-10">
                                <Button text lg onClick={onFavoriteClick}>
                                    {onRequest ? (
                                        <Spinner sm />
                                    ) : isFavorite ? (
                                        <HeartIconSolid className="h-6 w-6 text-primary" />
                                    ) : (
                                        <HeartIconOutline className="h-6 w-6 text-primary" />
                                    )}
                                </Button>

                                <Button
                                    primary
                                    lg
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                        videoRef?.current?.scrollIntoView()
                                    }
                                >
                                    <PlayIcon className="h-5 w-5" />
                                    <span className="text-base">Watch now</span>
                                </Button>
                            </div>

                            <div className="mt-10">
                                <Title title="Cast" />
                                <CastSlide casts={media.credits.cast} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* MEDIA VIDEOS */}
                <div ref={videoRef} className="pt-8">
                    <MediaVideosSlide
                        videos={media.videos.results.splice(0, 5)}
                    />
                </div>

                {/* MEDIA BACKDROPS */}
                {media.images.backdrops.length > 0 && (
                    <div className="mt-20">
                        <BackdropSlide backdrops={media.images.backdrops} />
                    </div>
                )}

                {/* MEDIA POSTERS */}
                {media.images.posters.length > 0 && (
                    <div className="mt-20">
                        <PosterSlide posters={media.images.posters} />
                    </div>
                )}

                {/* MEDIA REVIEWS */}
                <div className="mt-20">
                    <MediaReview
                        reviews={media.reviews}
                        media={media}
                        mediaType={mediaType}
                    />
                </div>

                {/* MEDIA RECOMMENDATION */}
                {media.recommend.length > 0 ? (
                    <div className="mt-20">
                        <RecommendSlide
                            medias={media.recommend}
                            mediaType={mediaType}
                        />
                    </div>
                ) : (
                    <MediaSlide
                        title="YOU MAY ALSO LIKE"
                        mediaType={mediaType}
                        mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                    />
                )}
            </div>
        </>
    );
}

export default MediaDetail;

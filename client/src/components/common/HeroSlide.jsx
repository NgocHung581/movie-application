import { PlayIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import Button from "../common/Button";
import CircularRate from "../common/CircularRate";

function HeroSlide({ mediaType, mediaCategory }) {
    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            const { res, error } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1,
            });

            if (res) setMovies(res.results);

            if (error) toast.error(error.message);

            dispatch(setGlobalLoading(false));
        };

        const getGenres = async () => {
            dispatch(setGlobalLoading(true));
            const { res, error } = await genreApi.getList({
                mediaType,
            });

            if (res) {
                setGenres(res.genres);
                getMedias();
            }

            if (error) {
                toast.error(error.message);
                dispatch(setGlobalLoading(false));
            }
        };

        getGenres();
    }, [mediaType, mediaCategory, dispatch]);

    return (
        <div className="h-screen w-screen relative hero-slide-gradient-vertical">
            <Swiper
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={false}
                navigation={false}
                modules={[Autoplay]}
                className="h-full w-full"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div
                            style={{
                                "--image-url": `url(${tmdbConfigs.backdropPath(
                                    movie.backdrop_path || movie.poster_path
                                )})`,
                            }}
                            className={`h-full bg-center bg-cover bg-[image:var(--image-url)] pt-[130%] md:pt-[80%] lg:pt-[60%]`}
                        ></div>
                        <div className="hero-slide-gradient-horizontal"></div>
                        <div className="w-full h-full absolute top-0 left-0 px-2.5 md:px-20 lg:px-40 flex z-[3]">
                            <div className="h-full md:w-[30%] lg:w-[50%] flex flex-col justify-center px-[30px]">
                                <h4 className="text-3xl lg:text-6xl font-bold">
                                    {movie.title || movie.name}
                                </h4>
                                <div className="flex items-center gap-4 mt-8">
                                    <CircularRate value={movie.vote_average} />

                                    <ul className="flex items-center gap-2">
                                        {movie.genre_ids.map((genreId) => (
                                            <li
                                                key={genreId}
                                                className="bg-primary rounded-full text-sm leading-8 px-3 text-white"
                                            >
                                                {
                                                    genres.find(
                                                        (genre) =>
                                                            genre.id === genreId
                                                    )?.name
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="mt-8 line-clamp-3 tracking-wide">
                                    {movie.overview}
                                </p>
                                <Button
                                    to={routesGen.mediaDetail(
                                        mediaType,
                                        movie.id
                                    )}
                                    primary
                                    lg
                                    className="w-max mt-8 flex items-center"
                                >
                                    <PlayIcon className="h-5 w-5 mr-2" />
                                    <span className="text-base">Watch now</span>
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

HeroSlide.propTypes = {
    mediaType: PropTypes.string.isRequired,
    mediaCategory: PropTypes.string.isRequired,
};

export default HeroSlide;

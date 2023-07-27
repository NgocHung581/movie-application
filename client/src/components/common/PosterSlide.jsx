import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import Title from "./Title";

function PosterSlide({ posters }) {
    return (
        <>
            <Title title="Posters" />

            <Swiper
                slidesPerView="auto"
                spaceBetween={0}
                grabCursor={true}
                className="h-max w-full"
            >
                {posters.map((poster, index) => (
                    <SwiperSlide
                        key={index}
                        className="w-1/3 md:w-1/4 lg:w-1/5"
                    >
                        <div
                            style={{
                                "--image-url": `url(${tmdbConfigs.posterPath(
                                    poster.file_path
                                )})`,
                            }}
                            className="bg-cover bg-center bg-[image:var(--image-url)] pt-[160%]"
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

PosterSlide.propTypes = {
    posters: PropTypes.array.isRequired,
};

export default PosterSlide;

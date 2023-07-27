import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";

import Title from "./Title";
import MediaItem from "./MediaItem";

function RecommendSlide({ medias, mediaType }) {
    return (
        <>
            <Title title="YOU MAY ALSO LIKE" />

            <Swiper
                slidesPerView="auto"
                spaceBetween={0}
                grabCursor={true}
                className="h-max w-full"
            >
                {medias.map((media, index) => (
                    <SwiperSlide
                        key={index}
                        className="w-1/3 md:w-1/4 lg:w-1/5"
                    >
                        <MediaItem media={media} mediaType={mediaType} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

RecommendSlide.propTypes = {
    medias: PropTypes.array.isRequired,
    mediaType: PropTypes.string.isRequired,
};

export default RecommendSlide;

import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import mediaApi from "../../api/modules/media.api";
import MediaItem from "./MediaItem";
import Title from "./Title";

function MediaSlide({ title, mediaType, mediaCategory }) {
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            const { res, error } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1,
            });

            if (res) setMedias(res.results);

            if (error) toast.error(error.message);
        };

        getMedias();
    }, [mediaType, mediaCategory]);

    return (
        <div className="mt-20 last:mb-20">
            {title && <Title title={title} />}

            <Swiper
                grabCursor={true}
                slidesPerView="auto"
                spaceBetween={0}
                className="w-full h-max"
            >
                {medias.map((media) => (
                    <SwiperSlide
                        key={media.id}
                        className="w-1/3 md:w-1/4 lg:w-1/5"
                    >
                        <MediaItem media={media} mediaType={mediaType} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

MediaSlide.propTypes = {
    title: PropTypes.string.isRequired,
    mediaType: PropTypes.string.isRequired,
    mediaCategory: PropTypes.string.isRequired,
};

export default MediaSlide;

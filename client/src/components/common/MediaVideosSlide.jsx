import PropTypes from "prop-types";
import { SwiperSlide } from "swiper/react";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";
import Title from "./Title";

function MediaVideo({ video, isActive }) {
    return (
        <div
            className={`h-max ${
                isActive ? "opacity-100" : "opacity-60"
            } transition-300`}
        >
            <iframe
                key={video.key}
                src={tmdbConfigs.youtubePath(video.key)}
                width="100%"
                title={video.id}
                className="border-none aspect-video"
            ></iframe>
        </div>
    );
}

function MediaVideosSlide({ videos }) {
    return (
        <>
            <Title title="Videos" />

            <NavigationSwiper>
                {videos.map((video) => (
                    <SwiperSlide key={video.key} className="w-full pb-12">
                        {({ isActive }) => (
                            <MediaVideo video={video} isActive={isActive} />
                        )}
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </>
    );
}

MediaVideosSlide.propTypes = {
    videos: PropTypes.array.isRequired,
};

MediaVideo.propTypes = {
    video: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
};

export default MediaVideosSlide;

import PropTypes from "prop-types";
import { SwiperSlide } from "swiper/react";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";
import Title from "./Title";

function BackdropSlide({ backdrops }) {
    return (
        <>
            <Title title="BACKDROPS" />

            <NavigationSwiper>
                {backdrops.splice(0, 10).map((backdrop, index) => (
                    <SwiperSlide key={index} className="pb-12">
                        {({ isActive }) => (
                            <div
                                style={{
                                    "--image-url": `url(${tmdbConfigs.backdropPath(
                                        backdrop.file_path
                                    )})`,
                                }}
                                className={`bg-top bg-cover bg-[image:var(--image-url)] aspect-video ${
                                    isActive ? "opacity-100" : "opacity-60"
                                } transition-300`}
                            ></div>
                        )}
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </>
    );
}

BackdropSlide.propTypes = {
    backdrops: PropTypes.array.isRequired,
};

export default BackdropSlide;

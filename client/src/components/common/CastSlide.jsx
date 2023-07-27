import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import { routesGen } from "../../routes/routes";

function CastSlide({ casts }) {
    return (
        <Swiper
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            spaceBetween={10}
            slidesPerView="auto"
            className="w-full h-max"
        >
            {casts.map((cast) => (
                <SwiperSlide key={cast.id} className="w-1/2 lg:w-1/5">
                    <Link to={routesGen.person(cast.id)}>
                        <div
                            style={{
                                "--image-url": `url(${tmdbConfigs.posterPath(
                                    cast.profile_path
                                )})`,
                            }}
                            className="pt-[120%] bg-[image:var(--image-url)] bg-cover bg-center relative"
                        >
                            <div className="absolute w-full h-max bottom-0 left-0 p-2.5 bg-[rgba(0,0,0,0.6)]">
                                <p className="line-clamp-1 text-white">
                                    {cast.name}
                                </p>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

CastSlide.propTypes = {
    casts: PropTypes.array.isRequired,
};

export default CastSlide;

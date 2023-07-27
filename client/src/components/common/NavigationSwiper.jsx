import PropTypes from "prop-types";
import { useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function NavigationSwiper({ children }) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <>
            <Swiper
                spaceBetween={10}
                grabCursor={true}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                    disabledClass: "opacity-30",
                }}
                pagination={{
                    clickable: true,
                    bulletClass:
                        "inline-block dark:bg-white bg-black h-2 w-2 rounded-full opacity-30 mx-1 cursor-pointer transition-300",
                    bulletActiveClass: "!opacity-100",
                }}
                modules={[Navigation, Pagination]}
                className="px-4 md:px-16 w-full h-max"
                centeredSlides={true}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {children}

                <div
                    ref={navigationPrevRef}
                    className="absolute z-10 top-1/2 left-0 -translate-y-1/2 cursor-pointer transition-300"
                >
                    <ChevronLeftIcon className="h-8 w-8 md:h-12 md:w-12" />
                </div>
                <div
                    ref={navigationNextRef}
                    className="absolute z-10 top-1/2 right-0 -translate-y-1/2 cursor-pointer transition-300"
                >
                    <ChevronRightIcon className="h-8 w-8 md:h-12 md:w-12" />
                </div>
            </Swiper>
        </>
    );
}

NavigationSwiper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NavigationSwiper;

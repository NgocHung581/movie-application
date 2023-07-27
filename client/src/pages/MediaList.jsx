import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import Button from "../components/common/Button";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import Spinner from "../components/common/Spinner";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

function MediaList() {
    const { mediaType } = useParams();

    const [medias, setMedias] = useState([]);
    const [mediasLoading, setMediasLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
    const categories = ["popular", "top_rated"];

    const onCategoryChange = (categoryIndex) => {
        if (currentCategory === categoryIndex) return;
        setMedias([]);
        setCurrentPage(1);
        setCurrentCategory(categoryIndex);
    };

    const onLoadMore = () => setCurrentPage(currentPage + 1);

    useEffect(() => {
        dispatch(setAppState(mediaType));

        setCurrentPage(1);
        setCurrentCategory(0);
    }, [mediaType, dispatch]);

    useEffect(() => {
        const getMedias = async () => {
            if (currentPage === 1) dispatch(setGlobalLoading(true));
            setMediasLoading(true);

            const { res, error } = await mediaApi.getList({
                mediaType,
                mediaCategory: mediaCategories[currentCategory],
                page: currentPage,
            });

            setMediasLoading(false);
            dispatch(setGlobalLoading(false));

            if (error) toast.error(error.message);
            if (res) {
                if (currentPage !== 1) {
                    setMedias((prev) => [...prev, ...res.results]);
                } else {
                    setMedias(res.results);
                }
            }
        };

        getMedias();
    }, [mediaType, currentPage, currentCategory, mediaCategories, dispatch]);

    return (
        <>
            <HeroSlide
                mediaType={mediaType}
                mediaCategory={mediaCategories[currentCategory]}
            />

            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h5 className="font-bold text-2xl">
                        {mediaType === tmdbConfigs.mediaType.movie
                            ? "Movies"
                            : "TV Series"}
                    </h5>
                    <div className="flex items-center gap-4">
                        {categories.map((category, index) => (
                            <Button
                                key={index}
                                lg
                                primary={currentCategory === index}
                                text={currentCategory !== index}
                                className="text-base font-medium leading-relaxed"
                                onClick={() => onCategoryChange(index)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                <MediaGrid medias={medias} mediaType={mediaType} />

                <Button
                    text
                    className="w-full mt-16 dark:text-primary text-primary"
                    onClick={onLoadMore}
                >
                    {mediasLoading ? <Spinner sm /> : "Load More"}
                </Button>
            </div>
        </>
    );
}

export default MediaList;

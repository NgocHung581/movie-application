import { TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import favoriteApi from "../api/modules/favorite.api";
import Button from "../components/common/Button";
import MediaItem from "../components/common/MediaItem";
import Spinner from "../components/common/Spinner";
import Title from "../components/common/Title";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";

function FavoriteItem({ media, onRemoved }) {
    const dispatch = useDispatch();

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;

        setOnRequest(true);

        const { res, error } = await favoriteApi.remove({
            favoriteId: media.id,
        });

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            dispatch(removeFavorite({ mediaId: media.mediaId }));
            onRemoved(media.id);
            toast.success("Remove Favorite Successfully");
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <MediaItem media={media} mediaType={media.mediaType} />
            <Button primary onClick={onRemove}>
                {onRequest ? <Spinner sm /> : <TrashIcon className="h-5 w-5" />}
                <span className="ml-2">Remove</span>
            </Button>
        </div>
    );
}

FavoriteItem.propTypes = {
    media: PropTypes.object.isRequired,
    onRemoved: PropTypes.func.isRequired,
};

function FavoriteList() {
    const dispatch = useDispatch();

    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const skip = 8;

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));

            const { res, error } = await favoriteApi.getList();

            dispatch(setGlobalLoading(false));

            if (error) toast.error(error.message);
            if (res) {
                setCount(res.length);
                setMedias([...res]);
                setFilteredMedias([...res].splice(0, skip));
            }
        };

        getFavorites();
    }, [dispatch]);

    const onLoadMore = () => {
        setFilteredMedias([
            ...filteredMedias,
            ...medias.splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    const onRemoved = (id) => {
        const newMedias = medias.filter((media) => media.id !== id);
        setMedias(newMedias);
        setFilteredMedias(newMedias.splice(0, page * skip));
        setCount(count - 1);
    };

    return (
        <div className="container mx-auto mt-20 p-4">
            <Title title={`YOUR FAVORITES (${count})`} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredMedias.map((media) => (
                    <FavoriteItem
                        key={media.id}
                        media={media}
                        onRemoved={onRemoved}
                    />
                ))}
            </div>
            {filteredMedias.length < medias.length && (
                <Button
                    text
                    onClick={onLoadMore}
                    className="mt-8 w-full dark:text-primary text-primary"
                >
                    Load More
                </Button>
            )}
        </div>
    );
}

export default FavoriteList;

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import tmdbConfigs from "../api/configs/tmdb.configs";
import reviewApi from "../api/modules/review.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { routesGen } from "../routes/routes";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import Title from "../components/common/Title";

function ReviewItem({ review, onRemoved }) {
    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;

        setOnRequest(true);

        const { res, error } = await reviewApi.remove({
            reviewId: review.id,
        });

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            onRemoved(review.id);
            toast.success("Remove Review Successfully");
        }
    };

    return (
        <div
            className={`relative flex flex-col md:flex-row p-2 dark:hover:bg-dark hover:bg-white mt-4 first:mt-0 ${
                onRequest ? "opacity-60" : "opacity-100"
            }`}
        >
            <div className="w-0 md:w-[10%]">
                <Link
                    to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
                >
                    <div
                        style={{
                            "--image-url": `url(${tmdbConfigs.posterPath(
                                review.mediaPoster
                            )})`,
                        }}
                        className={`bg-center bg-cover bg-[image:var(--image-url)] pt-[160%]`}
                    ></div>
                </Link>
            </div>
            <div className="w-full md:w-[90%] px-8">
                <Link
                    to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
                >
                    <h6 className="line-clamp-1 text-xl font-medium">
                        {review.mediaTitle}
                    </h6>
                </Link>
                <p className="mt-2 text-xs leading-loose">
                    {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </p>
                <p className="mt-2">{review.content}</p>
            </div>
            <Button
                primary
                className="relative md:absolute right-0 md:right-2.5 md:top-4 mt-4 md:mt-0"
                onClick={onRemove}
            >
                {onRequest ? <Spinner sm /> : <TrashIcon className="h-5 w-5" />}
                <span className="ml-2">Remove</span>
            </Button>
        </div>
    );
}

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    onRemoved: PropTypes.func.isRequired,
};

function ReviewList() {
    const dispatch = useDispatch();

    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const skip = 8;

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));

            const { res, error } = await reviewApi.getList();

            dispatch(setGlobalLoading(false));

            if (error) toast.error(error.message);
            if (res) {
                setCount(res.length);
                setReviews([...res]);
                setFilteredReviews([...res].splice(0, skip));
            }
        };

        getFavorites();
    }, [dispatch]);

    const onLoadMore = () => {
        setFilteredReviews([
            ...filteredReviews,
            ...reviews.splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    const onRemoved = (id) => {
        const newReview = reviews.filter((review) => review.id !== id);
        setReviews(newReview);
        setFilteredReviews(newReview.splice(0, page * skip));
        setCount(count - 1);
    };

    return (
        <div className="container mx-auto mt-20 p-4">
            <Title title={`YOUR REVIEWS (${count})`} />

            <div className="">
                {filteredReviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onRemoved={onRemoved}
                    />
                ))}
            </div>
            {filteredReviews.length < reviews.length && (
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

export default ReviewList;

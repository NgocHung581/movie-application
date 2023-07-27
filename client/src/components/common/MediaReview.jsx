import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import reviewApi from "../../api/modules/review.api";
import Button from "./Button";
import Spinner from "./Spinner";
import TextAvatar from "./TextAvatar";
import Title from "./Title";

function ReviewItem({ review, onRemoved }) {
    const { user } = useSelector((state) => state.user);

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;

        setOnRequest(true);

        const { res, error } = await reviewApi.remove({ reviewId: review.id });

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) onRemoved(review.id);
    };

    return (
        <div
            className={`p-4 rounded relative dark:hover:bg-dark hover:bg-white transition-300 ${
                onRequest ? "opacity-60" : "opacity-100"
            }`}
        >
            <div className="flex gap-4">
                <TextAvatar text={review.user.displayName} />

                <div className="flex-grow">
                    <h6 className="text-xl font-bold">
                        {review.user.displayName}
                    </h6>
                    <p className="text-xs mt-2 leading-loose">
                        {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </p>
                    <p className="mt-4">{review.content}</p>

                    {user && user.id === review.user.id && (
                        <Button
                            primary
                            onClick={onRemove}
                            className="relative md:absolute right-0 md:right-2.5 md:top-4 mt-4 md:mt-0"
                        >
                            {onRequest ? (
                                <Spinner sm />
                            ) : (
                                <TrashIcon className="h-5 w-5" />
                            )}
                            <span className="ml-2">Remove</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

function MediaReview({ reviews, media, mediaType }) {
    const { user } = useSelector((state) => state.user);

    const [listReviews, setListReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [onRequest, setOnRequest] = useState(false);
    const [content, setContent] = useState("");
    const [reviewCount, setReviewCount] = useState(0);

    const skip = 4;

    useEffect(() => {
        setListReviews([...reviews]);
        setFilteredReviews([...reviews].splice(0, skip));
        setReviewCount(reviews.length);
    }, [reviews]);

    const onAddReview = async () => {
        if (onRequest) return;

        const body = {
            content,
            mediaId: media.id,
            mediaType,
            mediaTitle: media.title || media.name,
            mediaPoster: media.poster_path,
        };

        setOnRequest(true);

        const { res, error } = await reviewApi.add(body);

        setOnRequest(false);

        if (error) toast.error(error.message);
        if (res) {
            toast.success("Post Review Successfully");
            setFilteredReviews([...filteredReviews, res]);
            setReviewCount(reviewCount + 1);
            setContent("");
        }
    };

    const onLoadMore = () => {
        setFilteredReviews([
            ...filteredReviews,
            ...[...listReviews].splice(page * skip, skip),
        ]);
        setPage(page + 1);
    };

    const onRemoved = (id) => {
        if (listReviews.findIndex((review) => review.id === id) !== -1) {
            const newListReviews = [...listReviews].filter(
                (review) => review.id !== id
            );
            setListReviews(newListReviews);
            setFilteredReviews([...newListReviews].splice(0, page * skip));
        } else {
            setFilteredReviews(
                [...filteredReviews].filter((review) => review.id !== id)
            );
        }
        setReviewCount(reviewCount - 1);

        toast.success("Remove Review Successfully");
    };

    return (
        <>
            <Title title={`Reviews (${reviewCount})`} />
            <div className="divide-y divide-[#1f1f1f] md:divide-y-0">
                {filteredReviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        onRemoved={onRemoved}
                    />
                ))}
                {filteredReviews.length < listReviews.length && (
                    <Button
                        text
                        className="dark:text-primary text-primary mt-8 w-full"
                        onClick={onLoadMore}
                    >
                        Load more
                    </Button>
                )}
            </div>
            {user && (
                <>
                    <div className="h-[1px] bg-[#1f1f1f] my-8"></div>
                    <div className="flex gap-4">
                        <TextAvatar text={user.displayName} />
                        <div className="flex-grow">
                            <h6 className="font-bold text-xl">
                                {user.displayName}
                            </h6>
                            <textarea
                                name="content"
                                rows="4"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your review"
                                className="resize-none w-full bg-transparent border-2 dark:border-[#ffffff3b] border-[#c4c4c4] rounded mt-4 px-[14px] py-4 dark:hover:border-white hover:border-black focus:border-primary transition-300"
                            ></textarea>
                            <Button
                                lg
                                primary
                                className="h-max mt-4"
                                onClick={onAddReview}
                            >
                                {onRequest ? (
                                    <Spinner sm />
                                ) : (
                                    <PaperAirplaneIcon className="h-6 w-6" />
                                )}
                                <span className="text-base ml-2">Post</span>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

ReviewItem.propTypes = {
    review: PropTypes.object.isRequired,
    onRemoved: PropTypes.func,
};

MediaReview.propTypes = {
    reviews: PropTypes.array.isRequired,
    media: PropTypes.object.isRequired,
    mediaType: PropTypes.string.isRequired,
};

export default MediaReview;

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/solid";

import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

const mediaTypes = ["movie", "tv", "people"];

function MediaSearch() {
    const [query, setQuery] = useState("");
    const [onSearch, setOnSearch] = useState(false);
    const [mediaType, setMediaType] = useState(mediaTypes[0]);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);

    const timer = useRef(null);

    const search = useCallback(async () => {
        setOnSearch(true);

        const { res, error } = await mediaApi.search({
            mediaType,
            query,
            page,
        });

        setOnSearch(false);

        if (error) toast.error(error.message);
        if (res) {
            if (page > 1) {
                setMedias((prev) => [...prev, ...res.results]);
            } else {
                setMedias(res.results);
            }
        }
    }, [mediaType, query, page]);

    const onCategoryChange = (selectedCategory) =>
        setMediaType(selectedCategory);

    const onQueryChange = (e) => {
        const newQuery = e.target.value;

        setQuery(newQuery);
    };

    useEffect(() => {
        if (!query.trim()) {
            setMedias([]);
            setPage(1);
        } else {
            clearTimeout(timer.current);

            timer.current = setTimeout(() => {
                search();
            }, 700);
        }
    }, [query, search]);

    useEffect(() => {
        setMedias([]);
        setPage(1);
    }, [mediaType]);

    return (
        <div className="container mx-auto mt-16 p-4">
            <div className="flex items-center justify-center gap-4">
                {mediaTypes.map((type, index) => (
                    <Button
                        key={index}
                        lg
                        primary={mediaType === type}
                        text={mediaType !== type}
                        className="text-base"
                        onClick={() => onCategoryChange(type)}
                    >
                        {type}
                    </Button>
                ))}
            </div>
            <div className="relative text-center mt-4">
                <input
                    type="text"
                    className="bg-transparent border-2 dark:border-[#ffffff3b] border-[#c4c4c4] dark:hover:border-white hover:border-black dark:focus:border-[#468149] focus:border-[#468149] rounded w-full py-3 pl-[14px] pr-12 transition-300"
                    placeholder="Search On MovieApp"
                    value={query}
                    onChange={onQueryChange}
                />
                {query && !onSearch && (
                    <XCircleIcon
                        className="h-6 w-6 absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                        onClick={() => setQuery("")}
                    />
                )}
                {query && onSearch && (
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                        <Spinner sm />
                    </div>
                )}
            </div>

            <div className="mt-4">
                <MediaGrid mediaType={mediaType} medias={medias} />

                {medias.length > 0 && (
                    <Button
                        text
                        className="w-full mt-4 dark:text-primary text-primary"
                        onClick={() => setPage(page + 1)}
                    >
                        {onSearch ? <Spinner sm /> : "Load More"}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default MediaSearch;

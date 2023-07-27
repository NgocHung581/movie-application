import {
    HomeIcon,
    TvIcon,
    MagnifyingGlassIcon,
    HeartIcon,
    PlayCircleIcon,
    PencilSquareIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeIcon className="w-6 h-6" />,
        state: "home",
    },
    {
        display: "movies",
        path: "/movie",
        icon: <PlayCircleIcon className="w-6 h-6" />,
        state: "movie",
    },
    {
        display: "tv series",
        path: "/tv",
        icon: <TvIcon className="w-6 h-6" />,
        state: "tv",
    },
    {
        display: "search",
        path: "/search",
        icon: <MagnifyingGlassIcon className="w-6 h-6" />,
        state: "search",
    },
];

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: <HeartIcon className="w-6 h-6" />,
        state: "favorite",
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: <PencilSquareIcon className="w-6 h-6" />,
        state: "reviews",
    },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockClosedIcon className="w-6 h-6" />,
        state: "password.update",
    },
];

const menuConfigs = { main, user };

export default menuConfigs;

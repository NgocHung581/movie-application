import tmdbConfigs from "../api/configs/tmdb.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaSlide from "../components/common/MediaSlide";

function HomePage() {
    return (
        <>
            <HeroSlide
                mediaType={tmdbConfigs.mediaType.movie}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
            />

            <div className="container mx-auto px-4 lg:px-0">
                <MediaSlide
                    title="POPULAR MOVIES"
                    mediaType={tmdbConfigs.mediaType.movie}
                    mediaCategory={tmdbConfigs.mediaCategory.popular}
                />
                <MediaSlide
                    title="POPULAR SERIES"
                    mediaType={tmdbConfigs.mediaType.tv}
                    mediaCategory={tmdbConfigs.mediaCategory.popular}
                />
                <MediaSlide
                    title="TOP RATED MOVIES"
                    mediaType={tmdbConfigs.mediaType.movie}
                    mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                />
                <MediaSlide
                    title="TOP RATED SERIES"
                    mediaType={tmdbConfigs.mediaType.tv}
                    mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                />
            </div>
        </>
    );
}

export default HomePage;

import PropTypes from "prop-types";

function GenresList({ genre_ids, genres }) {
    return (
        <ul className="flex items-center gap-2">
            {genre_ids.map((genreId) => (
                <li
                    key={genreId}
                    className="bg-primary rounded-full text-sm leading-8 px-3 text-white"
                >
                    {genres.find((genre) => genre.id === genreId)?.name}
                </li>
            ))}
        </ul>
    );
}

GenresList.propTypes = {
    genre_ids: PropTypes.array.isRequired,
    genres: PropTypes.array,
};

export default GenresList;

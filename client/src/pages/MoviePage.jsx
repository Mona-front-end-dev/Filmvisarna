import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { useContext, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "../css/MoviePage.module.css";
import Screening from "../components/Screening";
import FilterScreeningGroup from "../components/FilterScreeningGroup";

const Movie = (props) => {
	const { findMovie } = useContext(MovieContext);
	const {
		getScreeningsFromMovie,
		movieScreenings,
		filteredMovieScreenings,
		setFilterMovieId,
		message,
	} = useContext(ScreeningContext);

	const movie = findMovie(props.match.params.movieId);

	useEffect(() => {
		setFilterMovieId(props.match.params.movieId);
		getScreeningsFromMovie(props.match.params.movieId);
	}, []);

	if (!movie) {
		return null;
	}

	return (
		<div className={styles.moviePage}>
			<div className={styles.container}>
				<img className={styles.img} src={movie.poster} alt="Movie Logo" />
				<div>
					<h3>{movie.title}</h3>
				</div>
				<span>
					<b>{movie.genres.join(", ")}</b>
				</span>
				<hr />
				<div>
					<span>{movie.description}</span>
				</div>
				<br />
				<div>
					<span>
						<b>Length: </b>
						{movie.length}min
					</span>
				</div>
				<div>
					<span>
						<b>Year: </b>
						{movie.year}
					</span>
				</div>
				<div>
					<span>
						<b>Language: </b>
						{movie.language}
					</span>
				</div>
				<div>
					<span>
						<b>Directors: </b>
						{movie.directors.join(", ")}
					</span>
				</div>
				<div>
					<span>
						<b>Stars: </b>
						{movie.stars.join(", ")}
					</span>
				</div>
				<div>
					<span>
						<b>Rating:</b> {movie.rating}
					</span>
				</div>
				<div>
					<FilterScreeningGroup />
					{message ? <h3 className={styles.message}>{message}</h3> : ""}
          {movieScreenings && 
					<div>
						{!filteredMovieScreenings
							? movieScreenings.map((screening, i) => (
									<Screening screening={screening} movie={movie} key={i} />
							  ))
							: filteredMovieScreenings.map((screening, i) => (
									<Screening screening={screening} movie={movie} key={i} />
							  ))}
					</div>
          }
				</div>
			</div>
			<div className={styles.trailerContainer}>
				<YouTube className={styles.trailer} videoId={movie.trailer} />
			</div>
		</div>
	);
};

export default Movie;

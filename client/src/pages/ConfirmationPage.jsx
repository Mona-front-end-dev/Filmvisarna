import { MovieContext } from "../contexts/MoviesProvider";
import { ScreeningContext } from "../contexts/ScreeningProvider";
import { UserContext } from "../contexts/UserProvider";
import { useContext, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/ConfirmationPage.module.css";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const ConfirmationPage = (props) => {
	const { findMovie } = useContext(MovieContext);
	const { user } = useContext(UserContext);
	const movie = findMovie(props.match.params.movieId);
	const { getScreeningById, screening } = useContext(ScreeningContext);

	useEffect(() => {
		getScreeningById(props.match.params.screeningId);
	}, []);

	if (!movie || !screening || !user) {
		return <h1 className={styles.header}>Loading...</h1>;
	}

	const content = () => (
		<div className={styles.confirmationPage}>
			<div className={styles.container}>
				<Link to="/" className={styles.x}>
					X
				</Link>
				<h4>Thanks for your order, {user.email}!</h4>
				<h5>Salon: {screening.auditorium.id}</h5>
				<h5>{movie.title}</h5>
				<h5>{dayjs(screening.time).format("MMMM Do HH:mm")}</h5>
				<img className={styles.img} src={movie.poster} alt={movie.title} />
			</div>
		</div>
	);
	return <div>{screening && content()}</div>;
};

export default ConfirmationPage;
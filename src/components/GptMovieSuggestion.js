import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
	const { gptMovieResults, gptMovieNames } = useSelector((store) => store.gpt);

	if (!gptMovieNames) return null;
	return (
		<div className="p-4 m-4 bg-black text-white bg-opacity-90">
			<div>
				{gptMovieNames.map((movieName, index) => (
					<MovieList
						key={movieName}
						title={movieName}
						movies={gptMovieResults[index]}
					/>
				))}
			</div>
		</div>
	);
};

export default GptMovieSuggestion;

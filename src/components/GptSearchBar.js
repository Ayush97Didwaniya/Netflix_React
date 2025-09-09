import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
	const langKey = useSelector((store) => store.config.lang);
	const searchText = useRef(null);
	const dispatch = useDispatch();

	const searchMovieTMDB = async (movie) => {
		const data = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
			API_OPTIONS
		);
		const json = await data.json();
		return json.results;
	};

	const handleGptSearchClick = async () => {
		const gptQuery =
			"Act as a Movie Recommendation System and suggest some movies for the query :" +
			searchText.current.value +
			". Only give me names of 5 movies, comma seperated  like the example result given ahead. And remove comma from the movie name if it already exist. Example Result: Gadar, Sholay, YJHD, Golmal, Crazy stupid LOve";
		let gptResults;
		try {
			gptResults = await openai.chat.completions.create({
				model: "gpt-4o",
				messages: [{ role: "user", content: gptQuery }],
			});
		} catch (err) {
			console.log(err);
		}
		if (!gptResults.choices) {
			console.log("error has occured");
			return;
			// TODO: Write error handling
		}
		console.log("gpt result", gptResults.choices?.[0]?.message?.content);
		const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

		// For Each Movie search through TMDB API
		const promiseArray = gptMovies.map((movie) => {
			return searchMovieTMDB(movie);
		});
		const tmdbResults = await Promise.all(promiseArray);
		dispatch(
			addGptMovieResult({ movieResults: tmdbResults, movieNames: gptMovies })
		);
	};

	return (
		<div className="pt-[45%] md:pt-[10%] flex justify-center">
			<form
				className="w-full md:w-1/2 bg-black grid grid-cols-12"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					type="text"
					ref={searchText}
					className="p-4 m-4 col-span-9"
					placeholder={lang[langKey].gptSearchPlaceholder}
				/>
				<button
					className="py-2 m-4 px-0 md:px-4 bg-red-500 text-white rounded-lg col-span-3"
					onClick={handleGptSearchClick}
				>
					{lang[langKey].search}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;

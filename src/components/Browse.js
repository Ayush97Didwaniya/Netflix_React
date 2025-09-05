import Headers from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import GptSearch from "./GptSearch.js";
import { useSelector } from "react-redux";

const Browse = () => {
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

	// Fetch Data from TMDB API and update store
	useNowPlayingMovies();
	usePopularMovies();

	return (
		<div>
			{/* 
				Main Container
					-	Video Background
					-	video title
				Secondary Container
					-	Movie List * n
						- Cards * n
			*/}
			<Headers />
			{showGptSearch ? (
				<GptSearch />
			) : (
				<>
					<MainContainer></MainContainer>
					<SecondaryContainer></SecondaryContainer>
				</>
			)}
		</div>
	);
};

export default Browse;

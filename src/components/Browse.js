import Headers from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";

const Browse = () => {
	// Fetch Data from TMDB API and update store
	console.log(useNowPlayingMovies);
	useNowPlayingMovies();

	return (
		<div>
			<Headers></Headers>
			{/* 
				Main Container
					-	Video Background
					-	video title
				Secondary Container
					-	Movie List * n
						- Cards * n
			*/}
			<MainContainer></MainContainer>
			<SecondaryContainer></SecondaryContainer>
		</div>
	);
};

export default Browse;

import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
	return (
		<>
			<div className="fixed -z-10">
				<img
					className="bg-center bg-cover inset-0 h-screen"
					src={BG_URL}
					alt="logo"
				/>
			</div>
			<div className="">
				<GptSearchBar />
				<GptMovieSuggestion />
			</div>
		</>
	);
};

export default GptSearch;

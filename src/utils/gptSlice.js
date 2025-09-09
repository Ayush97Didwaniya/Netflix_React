import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
	name: "gpt",
	initialState: {
		showGptSearch: false,
		gptMovieResults: null,
		gptMovieNames: null,
	},
	reducers: {
		toggleGptSearchView: (state) => {
			state.showGptSearch = !state.showGptSearch;
		},
		addGptMovieResult: (state, action) => {
			const { movieNames, movieResults } = action.payload;
			state.gptMovieResults = movieResults;
			state.gptMovieNames = movieNames;
		},
	},
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: {
		lang: "en",
	},
	reducers: {
		changeLanguage: (store, action) => {
			store.lang = action.payload;
		},
	},
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;

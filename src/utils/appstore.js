import user from "./userSlice";
const { configureStore } = require("@reduxjs/toolkit");

const appStore = configureStore({
	reducer: { user },
});

export default appStore;

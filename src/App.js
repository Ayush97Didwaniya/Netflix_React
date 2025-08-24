import "./App.css"
import Body from "./components/Body"
import appStore from "./utils/appstore"
import { Provider } from "react-redux"

function App() {
	return (
		<Provider store={appStore}>
			<Body />
		</Provider>
	)
}

export default App

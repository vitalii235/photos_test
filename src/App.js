import './App.css';
import {CardsContainer} from "./Containers/CardsContainer/CardsContainer";
import {Container} from "@material-ui/core";
import {FilterContainer} from "./Containers/FilterContiner/FilterContainer";

function App() {
	return (
		<div className="App">
			<Container maxWidth={'lg'} style={{paddingBottom: 30}}>
				<FilterContainer/>
				<CardsContainer/>
			</Container>
		</div>
	);
}

export default App;

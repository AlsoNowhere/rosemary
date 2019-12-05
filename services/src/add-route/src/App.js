import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Example } from "./components/pages/Example";
import { Login } from "./components/account/login.component";

const App = () => {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={Home} />

				<Route path="/example" component={Example} />

				<Route path="/login" component={Login} />
			</Switch>
		</main>
	);
}

export default withRouter(App);

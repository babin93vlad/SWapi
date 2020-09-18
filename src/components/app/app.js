import React, { Component } from "react";

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorBoundry from "../error-boundry/error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context/swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import "./app.css";

export default class App extends Component {
	state = {
		showRandomPlanet: true,
		swapiService: new SwapiService(),
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service =
				swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

			return {
				swapiService: new Service(),
			};
		});
	};

	render() {
		return (
			<ErrorBoundry>
				<SwapiServiceProvider value={this.state.swapiService}>
					<div className="stardb-app">
						<Header onServiceChange={this.onServiceChange} />

						<RandomPlanet />
						<PeoplePage />
						<StarshipsPage />
						<PlanetsPage />
					</div>
				</SwapiServiceProvider>
			</ErrorBoundry>
		);
	}
}

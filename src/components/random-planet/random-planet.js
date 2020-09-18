import React, { Component } from "react";
import PropTypes from "prop-types";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";

import "./random-planet.css";

export default class RandomPlanet extends Component {
	swapiService = new SwapiService();

	static defaultProps = {
		updateInterval: 10000,
	};

	static propTypes = {
		updateInterval: PropTypes.number,
	};

	state = {
		planet: {},
		loading: true,
		error: false,
	};

	componentDidMount() {
		const { updateInterval } = this.props;
		this.updatePlanet();
		this.intevral = setInterval(this.updatePlanet, updateInterval);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onError = (err) => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false,
		});
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random() * 19) + 1;

		this.swapiService
			.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

	render() {
		const { planet, loading, error } = this.state;

		const hasData = !(loading || error);

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = hasData ? <PlanetView planet={planet} /> : null;

		return (
			<div className="random-planet jumbotron rounded">
				{errorMessage}
				{spinner}
				{content}
			</div>
		);
	}
}

const PlanetView = ({ planet }) => {
	const { id, name, population, rotationPeriod, diameter } = planet;
	return (
		<>
			<img
				className="planet-image"
				src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
				alt="img"
			/>
			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population: </span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation period: </span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter: </span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</>
	);
};

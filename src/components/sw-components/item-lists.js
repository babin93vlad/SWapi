import React from "react";
import ItemList from "../item-list/item-list";
import {
	compose,
	withChildFunction,
	withData,
	withSwapiService,
} from "../hoc-helpers";

const renderName = ({ name }) => <span>{name}</span>;

const personMapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople,
	};
};

const planetMapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets,
	};
};

const starshipMapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllStarships,
	};
};

const PersonList = compose(
	withSwapiService(personMapMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
	withSwapiService(planetMapMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
	withSwapiService(starshipMapMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };

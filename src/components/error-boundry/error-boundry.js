import React, { Component } from "react";
import ErrorMessage from "../error-message/error-message";

import "./error-boundry.css";

export default class ErrorBoundry extends Component {
	state = {
		hasError: false,
	};

	componentDidCatch() {
		this.setState({
			hasError: true,
		});
	}
	render() {
		if (this.state.hasError) {
			return <ErrorMessage />;
		}
		return this.props.children;
	}
}

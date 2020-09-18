import React, { Component } from "react";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../error-message/error-message";

const withData = (View, getData) => {
	return class extends Component {
		state = {
			data: null,
			loading: true,
			error: false,
		};

		componentDidMount() {
			this.updateItem();
		}

		componentDidUpdate(prevProps) {
			if (this.props.getData !== prevProps.getData) {
				this.updateItem();
			}
		}

		updateItem() {
			this.setState({
				loading: true,
				error: false,
			});

			this.props
				.getData()
				.then((data) => {
					this.setState({
						data,
						loading: false,
					});
				})
				.catch(() => {
					this.setState({
						error: true,
						loading: false,
					});
				});
		}

		render() {
			const { data, loading, error } = this.state;

			if (loading) {
				return <Spinner />;
			}

			if (error) {
				return <ErrorMessage />;
			}

			return <View {...this.props} data={data} />;
		}
	};
};

export default withData;

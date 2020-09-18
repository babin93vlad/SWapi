import React from "react";

import "./error-message.css";
import icon from "./error-img.png";

const ErrorMessage = () => {
	return (
		<div className="error-message">
			<img src={icon} alt="error" />
			<span className="boom">BOOM!</span>
			<span>something has gone terribly wrong</span>
			<span>(but we already sent droids to fix it)</span>
		</div>
	);
};

export default ErrorMessage;

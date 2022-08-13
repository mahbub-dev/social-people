import React from "react";
import "./loading.scss";
function Loading() {
	return (
		<div className="lds-ellipsis">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default Loading;

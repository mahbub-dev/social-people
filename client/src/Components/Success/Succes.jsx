import React from "react";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import "./succes.scss";
import { useEffect } from "react";
const Succes = ({ data }) => {
	const [style, setStyle] = useState({ opacity: "1" });
	const remove = () => {
		setStyle({ opacity: "0" });
	};
	useEffect(() => {
		setTimeout(() => setStyle({ opacity: "0" }), 5000);
	}, []);
	return (
		<p className="success" style={style}>
			{data} Successful{" "}
			<button onClick={remove}>
				<ImCross />
			</button>
		</p>
	);
};

export default Succes;

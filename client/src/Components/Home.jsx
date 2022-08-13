import React, { useEffect } from "react";
import { getUser } from "../server manger/user";
import { useState } from "react";

function Home() {
	const [data, setData] = useState([]);
	useEffect(() => {
		getUser((res) => {
			setData(res);
			console.log(res)
		});
	}, []);
	return (
		<div>

		</div>
	);
}

export default Home;

import React, { useEffect } from "react";
import { getUser } from "../server manger/user";
import { useState } from "react";

function Home() {
	const [data, setData] = useState([]);
	useEffect(() => {
		getUser((res) => {
			setData(res);
		});
	}, [data]);
	return (
		<div>
			{data.map((item) => (
				<div key={item._id}>
					<p style={{ color: "black" }}>{item.name}</p>
				</div>
			))}
		</div>
	);
}

export default Home;
